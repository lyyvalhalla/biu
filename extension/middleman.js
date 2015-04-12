// accept message from extension
// put content of message inside html dom with id 'json'
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("hehe");
    console.log(request.bookmarks);
    $("#json").html(request.bookmarks);
    sendResponse({bookmarks: request.bookmarks});
});
