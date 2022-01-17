function() {
                            addToCollectionCount(collectionId, itemsDropped.length, false);
                            if (inCollection) {
                                showCollection(contentListDisplayed);
                            }
                            $(document).trigger('done.newaddcontent.sakai', [itemsDropped, 'user']);
                            sakai.api.Util.progressIndicator.hideProgressIndicator();
                        }