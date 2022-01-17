function (success) {
                        if (success) {
                            resetView();
                            $(window).trigger('lhnav.updateCount', ['library', -(paths.length)]);
                            mylibrary.infinityScroll.removeItems(paths);
                            if(collectionPaths.length) {
                                $(window).trigger('sakai.mylibrary.deletedCollections', {
                                    items: collectionPaths
                                });
                            }
                        }
                    }