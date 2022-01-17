function() {
                    addToCollectionCount(collectionId, 1, true);
                    sakai.api.Util.progressIndicator.hideProgressIndicator();
                    if (inCollection) {
                        $.each(sakai.data.me.groups, function(index, item) {
                            if (item['sakai:category'] === 'collection' &&
                                !item['sakai:pseudoGroup'] &&
                                item['sakai:group-id'] === 'c-' + collectionId) {
                                contentListDisplayed = item;
                                contentListDisplayed._path = collectionId;
                            }
                        });
                        showCollection(contentListDisplayed);
                    } else {
                        showUIElements('reset');
                    }
                }