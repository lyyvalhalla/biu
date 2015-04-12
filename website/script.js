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

// send the bookmark json back to the extension
function sendBookmarkToExtension(jsonObject) {
    jsonString = JSON.stringify(jsonObject);
    chrome.runtime.sendMessage(extension_id, {bookmarks: jsonString});
}

// NOTE:
// this function is used to demonstrate the effect of sending modified bookmark
// json back to the extension, after it's successfully sent, the bookmarks
// should be over-written
$(document).ready(function() {
    var testBookmarkJson = [
    {
        "children": [
        {
            "children": [
            {
                "dateAdded": 1426460293083,
                "id": "7",
                "index": 0,
                "parentId": "1",
                "title": "＼(~o~)／ Code Lab",
                "url": "file:///Users/ruoyu.li/Dropbox/lyy_by_lry/index.html"
            },
            {
                "dateAdded": 1428649468630,
                "id": "9",
                "index": 1,
                "parentId": "1",
                "title": "google",
                "url": "https://www.google.com/"
            }
            ],
            "dateAdded": 1416532596847,
            "dateGroupModified": 1428714291760,
            "id": "1",
            "index": 0,
            "parentId": "0",
            "title": "Bookmarks Bar"
        },
        {
            "children": [],
            "dateAdded": 1416532596847,
            "id": "2",
            "index": 1,
            "parentId": "0",
            "title": "Other Bookmarks"
        },
        {
            "children": [
            {
                "dateAdded": 1411875397138,
                "id": "5",
                "index": 0,
                "parentId": "3",
                "title": "Hacker News Mobile - iHackerNews",
                "url": "http://ihackernews.com/"
            }
            ],
            "dateAdded": 1416532596847,
            "dateGroupModified": 1418357628958,
            "id": "3",
            "index": 2,
            "parentId": "0",
            "title": "Mobile Bookmarks"
        }
        ],
        "dateAdded": 1428818872229,
        "id": "0",
        "title": ""
    }
    ];

    $("#sendButton").click(function() {
        sendBookmarkToExtension(testBookmarkJson);
    });
});

