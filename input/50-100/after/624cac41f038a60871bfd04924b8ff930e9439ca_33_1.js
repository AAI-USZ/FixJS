function (success) {
                        if (success) {
                            resetView();
                            $(window).trigger('lhnav.updateCount', ['library', -(paths.length)]);
                            mylibrary.infinityScroll.removeItems(paths);
                            if(collectionPaths.length) {
                                $(document).trigger('sakai.mylibrary.deletedCollections', {
                                    items: collectionPaths
                                });
                            }
                        }
                    }