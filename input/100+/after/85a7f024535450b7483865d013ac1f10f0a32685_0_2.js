function (id) {
                var $header = $(selector + header), tabs;
                /**
                 * @param id Id of gadget to show, hide all others
                 */
                var show_gadget = function (id) {
                    $(selector).find('.OG-gadget-container [class*=OG-gadget-]').hide()
                        .filter('.OG-gadget-' + id).show();
                    live_id = id;
                };
                var is_south_pane_open = function () {
                    return layout.state.south.size !== $('.OG-layout-analytics-south .OG-gadget-tabs').height();
                };
                /** Manages the widths of the tabs when the panel is resized, the following stages exist:
                 *  0 - all tabs are full size
                 *  1 - all but the active tab are truncated
                 *  2 - tabs are truncated plus some/all are moved to an overflow panel
                 *  3 - same as above with active tab being truncated
                 */
                var reflow = function () {
                    var overflow_buffer = 25, // space for the overflow button
                        buttons_buffer = {'south': 23}, // add extra buffer space if the tabs area has buttons
                        min_tab_width = 50,
                        $tabs_container = $(selector + ' .OG-gadget-tabs'),
                        $tabs = $tabs_container.find('li[class^=og-tab-]'),
                        $active_tab = $(selector + ' .og-active'),
                        $overflow_button = $(selector + ' .og-overflow'),
                        active_tab_width = $active_tab.outerWidth(),
                        num_inactive_tabs = $tabs.length - 1,
                        new_tab_width, // new truncated width of a tab
                        compressed_tabs_width, // new full width of all tabs
                        space_needed, // number of pixles needed to reclaim
                        num_tabs_to_hide, // number of tabs to move to overflow
                        $tabs_to_move, // the actual tabs we are moving
                        // full available width
                        full_width = $tabs_container.width() - (overflow_buffer + (buttons_buffer[pane] || 0)),
                        // the full width of all the tabs
                        tabs_width = Array.prototype.reduce.apply($tabs
                            .map(function () {return $(this).outerWidth();}), [function (a, b) {return a + b;}, 0]);
                    // stage 1
                    if (tabs_width > full_width) {
                        new_tab_width = ~~((full_width - active_tab_width) / num_inactive_tabs);
                        new_tab_width = new_tab_width < min_tab_width ? min_tab_width : new_tab_width;
                        compressed_tabs_width = (num_inactive_tabs * new_tab_width) + active_tab_width;
                        // stage 2
                        if (compressed_tabs_width > full_width) {
                            $overflow_button.show().on('click', function (e) {
                                e.stopPropagation();
                                $overflow_panel.toggle();
                                var wins = [window].concat(Array.prototype.slice.call(window.frames));
                                if ($overflow_panel.is(":visible")) $(wins).on('click.overflow_handler', function () {
                                    $overflow_panel.hide();
                                    $(wins).off('click.overflow_handler');
                                });
                                else $(wins).off('click.overflow_handler');
                            });
                            space_needed = full_width - compressed_tabs_width;
                            num_tabs_to_hide = Math.ceil(Math.abs(space_needed) / new_tab_width);
                            if (num_tabs_to_hide) $overflow_panel.find('ul').html(
                                $tabs_to_move = $tabs.filter(':not(.og-active):lt(' + num_tabs_to_hide + ')')
                            );
                            // stage 3
                            if (num_tabs_to_hide >= $tabs.length) $active_tab.width(
                                active_tab_width
                                + (space_needed + ((num_inactive_tabs * min_tab_width) - overflow_buffer))
                                + 'px'
                            );
                        } else {
                            $overflow_panel.hide();
                        }
                        // set inactive tab widths to calculated value
                        $tabs.each(function () {if (!$(this).hasClass('og-active')) $(this).outerWidth(new_tab_width)});
                        // unset width of tabs in overflow panel
                        if ($tabs_to_move) $tabs_to_move.each(function () {$(this).attr('style', '');});
                        // set position of overflow panel
                        overflow.right = $(document).width() - ($overflow_button.offset().left + 25 - 5);
                        overflow.height = $overflow_button.height();
                        overflow.top = $overflow_button.offset().top + overflow.height + 4;
                        $overflow_panel.css({'right': overflow.right + 'px', 'top': overflow.top + 'px'});
                        $tabs.each(function () { // add tooltips to truncated tabs only
                            var $this = $(this);
                            if (!!$this.attr('style')) $this.attr('title', $this.text().trim());
                        });
                    }
                    // implement drag
                    $tabs.each(function (i) {
                        $(this).draggable({
                            revert: 'invalid', cursor: 'move', zIndex: 3,
                            iframeFix: true, appendTo: 'body', distance: 20,
                            helper: function() {return dropbox_template({label: $(this).text().trim()});}
                        }).data({gadget: gadgets[i], handler: function () {container.del(gadgets[i]);}});
                    });
                };
                if (id === null) $header.html(tabs_template({'tabs': [{'name': 'empty'}]})); // empty tabs
                else {
                    if (id === void 0) id = live_id;
                    tabs = gadgets.reduce(function (acc, val) {
                        return acc.push({
                            'name': val.config.name, 'active': (id === val.id), 'delete': true, 'id': val.id
                        }) && acc;
                    }, []);
                    if (pane === 'south') tabs.toggle = is_south_pane_open() ? 'minimize' : 'maximize'; // add toggle
                    $header.html(tabs_template({'tabs': tabs}));
                    reflow();
                    show_gadget(id);
                }
            }