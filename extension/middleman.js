// accept json from extension, then put json content inside html dom 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    $("#json").html(request.bookmarks);
});
