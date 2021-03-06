/**
 * parses any RSS/XML feed through Google and returns JSON data
 * source: http://stackoverflow.com/a/6271906/477958
 */
function parseRSS(url, widget) {
    $.ajax({
        url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
        dataType: 'json',
        success: function(data) {
        //console.log(data.responseData.feed);
            if(data.responseData == null){
                console.log("Unable to parse: " + url);
            } else {
                $(widget + ' h3').text(capitaliseFirstLetter(data.responseData.feed.title));
                container = $(widget + ' ol');

                $.each(data.responseData.feed.entries, function(key, value){
                    var thehtml = '<a class="collection-item truncate" href="' + value.link + '" target="_blank"><div class="feed-title"><i class="mdi-action-label"></i><p>' + value.title + '</p></div><div class="right feed-date">' + timeSince(new Date(value.publishedDate)) + ' ago</div></a>'

                    $(container).append(thehtml);
                });
            }
        },
        error: function(data) {
            console.log("Parse Error");
        }
    });
}

/**
 * Capitalizes the first letter of any string variable
 * source: http://stackoverflow.com/a/1026087/477958
 */
function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}