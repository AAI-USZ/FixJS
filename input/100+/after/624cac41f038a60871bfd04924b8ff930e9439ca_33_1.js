function (ev) {
                var $checked = $('.mylibrary_check:checked:visible', $rootel);
                if ($checked.length) {
                    var paths = [];
                    var collectionPaths = [];
                    $checked.each(function () {
                        paths.push($(this).data('entityid'));
                        if($checked.attr('data-type') === 'x-sakai/collection') {
                            collectionPaths.push($(this).data('entityid'));
                        }
                    });
                    $(document).trigger('init.deletecontent.sakai', [{
                        paths: paths,
                        context: mylibrary.contextId
                    }, function (success) {
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
                    }]);
                }
            }