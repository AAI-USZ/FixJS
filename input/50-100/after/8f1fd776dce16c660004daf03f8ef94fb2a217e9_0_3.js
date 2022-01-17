function (i, item) {
                    var imgUrl = item.data.url;
                    var title = item.data.title;
                    var commentsUrl = "http://www.reddit.com" + item.data.permalink;

                    // ignore albums and things that don't seem like image files
                    if (isImageUrl(imgUrl)) {
                        foundOneImage = true;
                        addImageSlide(imgUrl, title, commentsUrl);
                    }
                }