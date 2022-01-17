function () {
            url = redditBaseUrl + subredditUrl + ".json?jsonp=?" + after + "&" + getVars;
            $.getJSON(url, function (data) {
                redditData = data
                after = "&after=" + data.data.after;

                $.each(data.data.children, function (i, item) {
                    var url = item.data.url;
                    var title = item.data.title;
                    var commentsUrl = "http://www.reddit.com" + item.data.permalink;

                    // ignore albums and things that don't seem like image files
                    if (url.charAt(url.length - 4) == '.') {
                        addImageSlide(url, title, commentsUrl);
                    }
                });
            });
        }