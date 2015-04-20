pattern = 'www.bookmark-b.io';

// send json to middleman
chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
        var jsonString = JSON.stringify(bookmarkTreeNodes, null, 2);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {bookmarks: jsonString});
        });
    });
});

// accept json from website, then over-write user bookmarks
chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    switch (request.operation) {
        case 'remove':
            chrome.bookmarks.remove(request.id);
            break;
        case 'create':
            chrome.bookmarks.create({
                'parentId'  : request.parentId,
                'index'     : request.index,
                'title'     : request.title,
                'url'       : request.url
            });
            break;
        case 'move':
            chrome.bookmarks.move(request.id, {
                'parentId'  : request.parentId,
                'index'     : request.index
            });
            break;
        case 'update':
            chrome.bookmarks.update(request.id, {
                'title'     : request.title,
                'url'       : request.url
            });
            break;
    }
});

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
