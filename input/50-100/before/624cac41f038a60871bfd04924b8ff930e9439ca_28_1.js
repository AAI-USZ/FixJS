function() {
                            addToCollectionCount(collectionId, itemsDropped.length, false);
                            if (inCollection) {
                                showCollection(contentListDisplayed);
                            }
                            $(window).trigger('done.newaddcontent.sakai', [itemsDropped, 'user']);
                            sakai.api.Util.progressIndicator.hideProgressIndicator();
                        }