chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
        json = JSON.stringify(bookmarkTreeNodes, null, 2);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {bookmarks: json}, function(response) {
                console.log("response from content script:")
                console.log(response.bookmarks);
            });
        });
    });
});
