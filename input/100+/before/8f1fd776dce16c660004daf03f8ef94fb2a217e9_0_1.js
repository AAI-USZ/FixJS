function(data) {
                redditData = data
                after = "&after=" + data.data.after;
                
                if (data.data.children.length == 0) {
                    alert("No data from this url :(");
                    return;
                }
                
                $.each(data.data.children, function (i, item) {
                    var imgUrl = item.data.url;
                    var title = item.data.title;
                    var commentsUrl = "http://www.reddit.com" + item.data.permalink;

                    // ignore albums and things that don't seem like image files
                    if (isImageUrl(imgUrl)) {
                        addImageSlide(imgUrl, title, commentsUrl);
                    }
                });
                
                // show the first image
                if (activeIndex == -1) {
                    startAnimation(0);

                    //activeIndex = 0;
                    //animateNavigationBox(0);
                    //slideBackgroundPhoto(0);
                    //resetNextSlideTimer()
                }
            }