function() {
                    // Add it to the collection
                    if (collectionId !== 'library') {
                        sakai.api.Content.Collections.addToCollection(collectionId, itemIDs, function() {
                            addToCollectionCount(collectionId, itemsDropped.length, false);
                            if (inCollection) {
                                showCollection(contentListDisplayed);
                            }
                            $(document).trigger('done.newaddcontent.sakai', [itemsDropped, 'user']);
                            sakai.api.Util.progressIndicator.hideProgressIndicator();
                        });
                    } else {
                        addToCollectionCount(collectionId, itemsDropped.length, false);
                        if (inCollection) {
                            showCollection(contentListDisplayed);
                        }
                        $(document).trigger('done.newaddcontent.sakai', [itemsDropped, 'user']);
                        sakai.api.Util.progressIndicator.hideProgressIndicator();
                    }
                }