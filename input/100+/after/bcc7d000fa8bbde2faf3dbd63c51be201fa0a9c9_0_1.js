function callTwitterAsync() {

    return $.ajax({
        url: 'https://api.twitter.com/1/statuses/user_timeline.json',
        data: {
            user_id: 263189907,
            screen_name: "rambomtb",
            count: 10,
            trim_user: 1
        },
        type: 'GET',
        timeout: TIMEOUT,
        dataType: 'jsonp',

        success: function(json) {
            console.log("done getting Twitter data");
            //print("success");
            //print(Object.keys(json));

            twitterData = json;

//            for (var i=0; i<json.length; i++) {
//                var tweet = json[i];
//                console.log("**************************");
//                console.log("Date: "+ tweet.created_at);
//                console.log("Text: "+ tweet.text);
//
//            }

        },

        error:function (jqXHR, textStatus, errorThrown) {
            console.log("Twitter API error: "+textStatus);
            twitterData =  ERROR_FLAG;
            //alert('Sorry, there was a problem retrieving Twitter info.  '+TRY_AGAIN_MSG);
        }
    });
}