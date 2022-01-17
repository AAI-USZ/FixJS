function(data) {
                            var buf = null;
                            data = data.toString();
                            if (isRss(data)) {
                                buf = modifyRssAndReturnBuffer(data);
                            } else if (isHtml(data)) {
                                buf = modifyHtmlAndReturnBuffer(data);
                            } else {
                                buf = new Buffer(replaceSoupLinksInString(data));
                            }
                            callback(buf);
                        }