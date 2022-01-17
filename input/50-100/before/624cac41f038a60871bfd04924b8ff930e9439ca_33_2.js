function (success) {
                        if (success) {
                            resetView();
                            $(window).trigger('lhnav.updateCount', ['library', -(paths.length)]);
                            if(collection) {
                                $(window).trigger('sakai.mylibrary.deletedCollections', {
                                    items: paths
                                });
                            }
                            mylibrary.infinityScroll.removeItems(paths);
                        }
                    }