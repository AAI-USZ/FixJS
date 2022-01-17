function (selector) {
            var initialized = false, loading, gadgets = [], container = this,
                layout = og.views.common.layout.inner,
                pane, // layout pannel
                live_id, // active tab id
                overflow = {}, // document offet of overflow panel
                $overflow_panel; // panel that houses non visible tabs
            /**
             * @param {Number|Null} id
             *        if id is a Number set the active tab to that ID
             *        if id is undefined use the current Live ID and reflow tabs
             *        if id is null set tabs to a single empty tab
             */
            var update_tabs = function (id) {
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
            };
            container.init = function (arr) {
                /**
                 * @param {String} pane Pane to toggle
                 * @param {Boolean} open_only Don't close, only open
                 */
                var toggle_pane = function (pane, open_only) {
                    var max = '50%', min = $('.OG-layout-analytics-' + pane + ' .OG-gadget-tabs').height(),
                        minimize = layout.sizePane.partial(pane, min),
                        maximize = layout.sizePane.partial(pane, max);
                    layout.state[pane].size === min
                        ? maximize()
                        : open_only ? null : minimize();
                };
                loading = true;
                $.when(
                    api.text({module: 'og.analytics.tabs_tash'}),
                    api.text({module: 'og.analytics.tabs_overflow_tash'}),
                    api.text({module: 'og.analytics.dropbox_tash'})
                ).then(function (tabs_tmpl, overflow_tmpl, dropbox_tmpl) {
                    pane = panels[selector];
                    if (!tabs_template) tabs_template = Handlebars.compile(tabs_tmpl);
                    if (!overflow_template) overflow_template = Handlebars.compile(overflow_tmpl);
                    if (!dropbox_template) dropbox_template = Handlebars.compile(dropbox_tmpl);
                    if (!$overflow_panel) $overflow_panel = $(overflow_template({pane: pane})).appendTo('body');
                    initialized = true;
                    loading = false;
                    // setup click handlers
                    $(selector + header + ' , .og-js-overflow-' + pane)
                        // handler for tabs (including the ones in the overflow pane)
                        .on('click', 'li[class^=og-tab-]', function (e) {
                            var id = extract_id($(this).attr('class')),
                                index = gadgets.reduce(function (acc, val, idx) {
                                    return acc + (val.id === id ? idx : 0);
                                }, 0);
                            if ($(e.target).hasClass('og-delete')) container.del(gadgets[index]);
                            else if (!$(this).hasClass('og-active')) {
                                update_tabs(id || null);
                                if (id) gadgets[index].gadget.resize();
                            }
                            if (pane === 'south') toggle_pane(pane, true);
                        })
                        // handler for min/max toggle button
                        .on('click', '.og-js-toggle', function () {if (pane === 'south') toggle_pane(pane);});
                    if (!arr) update_tabs(null); else container.add(arr);
                    // implement drop
                    $('.OG-layout-analytics-' + pane).droppable({
                        hoverClass: 'og-drop',
                        accept: function (draggable) {
                            var pane = extract_pane($(this).attr('class')),
                                pane_class = 'OG-layout-analytics-' + pane,
                                overflow_class = 'og-js-overflow-' + pane,
                                has_ancestor = function (elm, sel) {
                                    return $(elm).parentsUntil('.' + sel).parent().hasClass(sel);
                                };
                            return $(draggable).is('li[class^=og-tab-]') // is it a tab...
                                && !has_ancestor(draggable, pane_class) // that isnt a child of the active pane...
                                && !has_ancestor(draggable, overflow_class); // or a child of active overflow panel
                        },
                        drop: function(e, ui) {
                            var data = ui.draggable.data(), gadget = data.gadget.config.options;
                            gadget.selector = gadget.selector.replace(/analytics\-(.*?)\s/, 'analytics-' + pane + ' ');
                            container.add([data.gadget.config]);
                            setTimeout(data.handler); // setTimeout to ensure handler is called after drag evt finishes
                        }
                    });
                    og.common.gadgets.manager.register(container);
                });
            };
            /**
             * @param {Array}          arr An array of gadget configuration objects
             * @param {Function}       arr[x].gadget
             * @param {Object}         arr[x].options
             * @param {String}         arr[x].name Tab name
             * @param {Boolean}        arr[x].margin Add margin to the container
             */
            container.add = function (arr) {
                if (!loading && !initialized)
                    return container.init(), setTimeout(container.add.partial(arr), 10), container;
                if (!initialized) return setTimeout(container.add.partial(arr), 10), container;
                if (!selector) throw new TypeError('GadgetsContainer has not been initialized');
                var panel_container = selector + ' .OG-gadget-container', new_gadgets;
                new_gadgets = arr.map(function (obj) {
                    var id, gadget_class = 'OG-gadget-' + (id = counter++), gadget,
                        gadget_selector = panel_container + ' .' + gadget_class;
                    $(panel_container)
                        .append('<div class="' + gadget_class + '" />')
                        .find('.' + gadget_class)
                        .css({height: '100%', margin: obj.margin ? 10 : 0});
                    gadgets.push(gadget = {
                        id: id,
                        config: obj,
                        gadget: new obj.gadget($.extend(true, obj.options, {selector: gadget_selector}))
                    });
                    return gadget;
                });
                update_tabs(new_gadgets[new_gadgets.length - 1].id);
                return container;
            };
            container.del = function (obj) {
                $(selector + ' .OG-gadget-container .OG-gadget-' + obj.id).remove();
                gadgets.splice(gadgets.indexOf(obj), 1);
                update_tabs(gadgets.length
                    ? live_id === obj.id ? gadgets[gadgets.length - 1].id : live_id
                    : null
                ); // new active tab or empty
            };
            container.alive = function () {return !!$(selector).length;};
            container.resize = function () {
                gadgets.forEach(function (obj) {
                    if (obj.id === live_id) {
                        $(selector + ' .ui-layout-content').show();
                        update_tabs();
                        obj.gadget.resize();
                    }
                });
            }
        }