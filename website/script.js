window.onload = function() {
    $('#json').bind('DOMSubtreeModified', function(e) {
        if (e.target.innerHTML.length > 0) {
            var json = JSON.parse(e.target.innerHTML);
            console.log(json);
        }
    });
};

function sendBookmarkToExtension() {

}
