function(ev) {
                if ($(this).attr('data-entityid')) {
                    var paths = [];
                    var collection = false;
                    if($(this).attr('data-type') === 'x-sakai/collection') {
                        collection = true;
                    }
                    paths.push($(this).attr('data-entityid'));
                    $(document).trigger('init.deletecontent.sakai', [{
                        paths: paths,
                        context: mylibrary.contextId
                    }, function (success) {
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
                    }]);
                }
            }