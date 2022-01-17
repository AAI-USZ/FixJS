function (e) {
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
                        }