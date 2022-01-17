function(responseData, success){
                            if (success) {
                                // update the entity widget with the new activity
                                $window.trigger('updateContentActivity.entity.sakai', 'CONTENT_ADDED_COMMENT');
                                if (!rootel.parents(".collectionviewer_collection_item_comments").length){
                                    $window.trigger('sakai.entity.updatecountcache', {increment: true});
                                }
                            }
                        }