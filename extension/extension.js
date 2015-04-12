pattern = '127.0.0.1';

// send json to middleman
chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
        var jsonString = JSON.stringify(bookmarkTreeNodes, null, 2);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {bookmarks: jsonString}, function(response) {
                // console.log("response from content script:")
                // console.log(response.bookmarks);
            });
        });
    });
});

// accept json from website, then over-write user bookmarks
chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    bookmarkTreeNodes = JSON.parse(request.bookmarks);
    for (var i=0; i<bookmarkTreeNodes[0].children.length; i++) {
        default_node = bookmarkTreeNodes[0].children[i];
        for (var j=0; j<default_node.children.length; j++) {
            modifiable_node = default_node.children[j];
            console.log(modifiable_node);
        }
    }
});

function createBookmarkNode(node) {
    // base case: not a folder or an empty folder, create it and stop
    if (node.children === undefined || node.children.length === 0) {
        chrome.bookmarks.create(
            {'parentId': node.parentId,
             'title': 'Extension bookmarks'},
             function(newFolder) {
                console.log("added folder: " + newFolder.title);
            });
    }

}

// NOTE: ignore this function, do not touch
// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: pattern },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
