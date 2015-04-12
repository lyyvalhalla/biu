extension_id = "caaifllcdjoogkpmgamjhhmmoianfepn"

// watch the html element that should contain the json string for change
// when it's changed, it means the extension has sent us the json string via
// the middleman, now we can use that json string to do stuff
window.onload = function() {
    $('#json').bind('DOMSubtreeModified', function(e) {
        if (e.target.innerHTML.length > 0) {
            var jsonHtml = e.target.innerHTML;      // the stringified json in a string
            var jsonObject = JSON.parse(jsonHtml);  // the actual object
            console.log(jsonHtml);                
            console.log(jsonObject);

            // ...
            // did a bunch of stuff, modified the jsonObject
            // now ready to send it back, call sendBookmarkToExtension here
        }
    });
};

$(document).ready(function() {
    $("button").click(function() {
        sendBookmarkToExtension({});
    });
});

function sendBookmarkToExtension(jsonObject) {
    jsonString = JSON.stringify(jsonObject);
    chrome.runtime.sendMessage(extension_id, {bookmarks: jsonString}, function(response) {
        // console.log(response);
    });   
}
