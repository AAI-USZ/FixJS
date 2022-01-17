function() {
            /**
             * Enable/disable the remove selected button depending on whether
             * any items in the library are checked
             */
            $mylibrary_check.live('change', function (ev) {
                if ($(this).is(':checked')) {
                    $mylibrary_remove.removeAttr('disabled');
                    $mylibrary_addto.removeAttr('disabled');
                    $mylibrary_share.removeAttr('disabled');
                } else if (!$('.mylibrary_check:checked', $rootel).length) {
                    $mylibrary_remove.attr('disabled', 'disabled');
                    $mylibrary_addto.attr('disabled', 'disabled');
                    $mylibrary_share.attr('disabled', 'disabled');
                }
                updateButtonData();
            });

            /**
             * Check/uncheck all loaded items in the library
             */
            $mylibrary_check_all.change(function (ev) {
                if ($(this).is(':checked')) {
                    $('.mylibrary_check').attr('checked', 'checked');
                    $mylibrary_remove.removeAttr('disabled');
                    $mylibrary_addto.removeAttr('disabled');
                    $mylibrary_share.removeAttr('disabled');
                } else {
                    $('.mylibrary_check').removeAttr('checked');
                    $mylibrary_remove.attr('disabled', 'disabled');
                    $mylibrary_addto.attr('disabled', 'disabled');
                    $mylibrary_share.attr('disabled', 'disabled');
                }
                updateButtonData();
            });

            /**
             * Gather all selected library items and initiate the
             * deletecontent widget
             */
            $mylibrary_remove.click(function (ev) {
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
                    $(window).trigger('init.deletecontent.sakai', [{
                        paths: paths,
                        context: mylibrary.contextId
                    }, function (success) {
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
                    }]);
                }
            });

            /**
             * Called when clicking the remove icon next to an individual content
             * item
             */
            $mylibrary_remove_icon.live('click', function(ev) {
                if ($(this).attr('data-entityid')) {
                    var paths = [];
                    var collection = false;
                    if($(this).attr('data-type') === 'x-sakai/collection') {
                        collection = true;
                    }
                    paths.push($(this).attr('data-entityid'));
                    $(window).trigger('init.deletecontent.sakai', [{
                        paths: paths,
                        context: mylibrary.contextId
                    }, function (success) {
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
                    }]);
                }
            });

            /**
             * Reload the library list based on the newly selected
             * sort option
             */
            $mylibrary_sortby.change(function (ev) {
                var query = $.trim($mylibrary_livefilter.val());
                var sortSelection = $(this).val();
                if (sortSelection === 'desc') {
                    mylibrary.sortOrder = 'desc';
                    mylibrary.sortBy = 'filename';
                } else if (sortSelection === 'asc') {
                    mylibrary.sortOrder = 'asc';
                    mylibrary.sortBy = 'filename';
                } else {
                    mylibrary.sortOrder = 'modified';
                    mylibrary.sortBy = '_lastModified';
                }
                $.bbq.pushState({'lsb': mylibrary.sortBy, 'lso': mylibrary.sortOrder, 'lq': query});
            });

            /**
             * Initiate a library search when the enter key is pressed
             */
            $mylibrary_livefilter.keyup(function (ev) {
                if (ev.keyCode === 13) {
                    doSearch();
                }
                return false;
            });

            /**
             * Initiate a search when the search button next to the search
             * field is pressed
             */
            $mylibrary_search_button.click(doSearch);

            /**
             * Initiate the add content widget
             */
            $mylibrary_addcontent.click(function (ev) {
                $(window).trigger('init.newaddcontent.sakai');
                return false;
            });

            /**
             * An event to listen from the worldsettings dialog so that we can refresh the title if it's been changed.
             * @param {String} title     New group name
             */
            $(window).on('updatedTitle.worldsettings.sakai', function(e, title) {
                renderLibraryTitle(title, true);
            });

            /**
             * Listen for newly the newly added content or newly saved content
             * @param {Object} data        Object that contains the new library items
             * @param {Object} library     Context id of the library the content has been added to
             */
            $(window).bind('done.newaddcontent.sakai', function(e, data, library) {
                if (library === mylibrary.contextId || mylibrary.contextId === sakai.data.me.user.userid) {
                    mylibrary.infinityScroll.prependItems(data);
                }
            });

            /**
             * Keep track as to whether the current library widget is visible or not. If the
             * widget is not visible, it's not necessary to respond to hash change events.
             */
            $(window).bind(tuid + '.shown.sakai', function(e, shown) {
                mylibrary.widgetShown = shown;
            });
            /**
             * Bind to hash changes in the URL
             */
            $(window).bind('hashchange', handleHashChange);

            $mylibrary_show_list.click(function() {
                $.bbq.pushState({'ls': 'list'});
            });

            $mylibrary_show_grid.click(function() {
                $.bbq.pushState({'ls': 'grid'});
            });
        }