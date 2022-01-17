function callYQLAsync() {

    var query1 = 'select id, title.content, updated, summary.content, content.content from atom where url="http://www.rambo-mtb.org/?feed=atom" and category.term not in ("Trails Status")';
    var query2 = 'select id, title.content, updated, summary.content, content.content from atom where url="http://www.rambo-mtb.org/?feed=atom" and category.term = "Trails Status"';

    return $.ajax({
        url:'http://query.yahooapis.com/v1/public/yql',
        data:{
            q:"select * from yql.query.multi where queries='"+query1+";"+query2+"'",
            format:'json'
        },
        type:'GET',
        dataType:'jsonp',
        jsonp:'callback',
        timeout: TIMEOUT,
        jsonpCallback:'cbfunc',

        success:function (json) {
            //print("success");
            //print(Object.keys(json));
            console.log("done getting RSS/ATOM data");

            rssFeedData = json.query.results.results[0].entry;

//            console.log("**************************");
//            console.log("Count: "+ rssFeedData.query.count);

            //var feedItems = rssFeedData.query.results.results[0].entry;
            for (var i = 0; i < rssFeedData.length; i++) {
                rssFeedData[i].feedNum = i;
                rssFeedData[i].updatedDate = getFormattedDate(new Date(Date.parse(rssFeedData[i].updated)));
            }

            trailStatusData = json.query.results.results[1].entry;
            if (trailStatusData) {
                var rawDate = new Date(Date.parse(trailStatusData.updated));
                trailStatusData.updatedDate =  getFormattedDate(rawDate) + " @ " + getFormattedTime(rawDate);
            } else {
                // default if not found
                trailStatusData.title = "No recent updates.  The trails are probably open!";
                trailStatusData.updatedDate = null;
            }

            //console.log(trailStatusData);

        },

        error:function (jqXHR, textStatus, errorThrown) {
            console.log("Yahoo API error: "+textStatus);
            rssFeedData = ERROR_FLAG;
            trailStatusData = {};
            trailStatusData.title = ERROR_MSG_NO_DATA;
            trailStatusData.updatedDate = "N/A";
            //alert('Sorry, there was a problem retrieving Website News and Trail Status.  '+TRY_AGAIN_MSG);
        }
    });

}