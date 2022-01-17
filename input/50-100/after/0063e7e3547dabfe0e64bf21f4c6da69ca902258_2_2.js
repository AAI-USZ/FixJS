function() {
                                data.results.fetchMultipleUserDataInWidget = true;
                                sakai.api.Content.prepareContentForRender(data.results, sakai.data.me, function(parsedContent) {
                                    collectionData[(collectionviewer.page - 1)] = parsedContent;
                                    showData();
                                });
                            }