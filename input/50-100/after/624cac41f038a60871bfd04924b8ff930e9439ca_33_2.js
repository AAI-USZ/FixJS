function (success) {
                        if (success) {
                            resetView();
                            $(window).trigger('lhnav.updateCount', ['library', -(paths.length)]);
                            if(collection) {
                                $(document).trigger('sakai.mylibrary.deletedCollections', {
                                    items: paths
                                });
                            }
                            mylibrary.infinityScroll.removeItems(paths);
                        }
                    }