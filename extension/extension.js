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
    console.log(request);
});

// NOTE: ignore this function
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
            pageUrl: { hostEquals: '127.0.0.1' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
