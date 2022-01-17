function() {
                            data.results.fetchMultipleUserDataInWidget = true;
                            sakai.api.Content.prepareContentForRender(data.results, sakai.data.me, function(parsedContent) {
                                callback(data);
                            });
                        }