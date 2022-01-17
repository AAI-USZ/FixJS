function (historyRequests) {

            var outAr = [];

            var count = historyRequests.length;



            if (count === 0) {

                $('#messageNoHistoryTmpl').tmpl([

                    {}

                ]).appendTo('#sidebarSection-history');

            }

            else {

                for (var i = 0; i < count; i++) {

                    var r = historyRequests[i];

                    postman.urlCache.addUrl(r.url);



                    var url = historyRequests[i].url;



                    if (url.length > 80) {

                        url = url.substring(0, 80) + "...";

                    }

                    url = limitStringLineWidth(url, 40);



                    var request = {

                        url:url,

                        method:historyRequests[i].method,

                        id:historyRequests[i].id,

                        position:"top"

                    };



                    outAr.push(request);

                }



                outAr.reverse();



                $('#itemHistorySidebarRequest').tmpl(outAr).prependTo('#historyItems');

                $('#historyItems').fadeIn();

            }



            postman.history.requests = historyRequests;

            postman.layout.refreshScrollPanes();

        }