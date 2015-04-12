// accept json from extension, then put json content inside html dom 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // console.log(request.bookmarks)";
    $("#json").html(request.bookmarks);
    sendResponse({bookmarks: request.bookmarks});
});
