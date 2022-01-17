function() {
                            try {
                                for (var i = 0; i < obj.selection_list.length; i++) {
                                    xulG.new_tab(
                                        xulG.url_prefix(urls.XUL_REMOTE_BROWSER),
                                        {
                                            'tab_name' : document.getElementById('commonStrings').getFormattedString('tab.label.triggered_events_for_copy',[ obj.selection_list[i].barcode ])
                                        },
                                        {
                                            'url': urls.EG_TRIGGER_EVENTS + "?copy_id=" + obj.selection_list[i].copy_id,
                                            'show_print_button': false,
                                            'show_nav_buttons': false
                                        }
                                    );
                                }
                            } catch(E) {
                                alert('Error in copy_status.js, cmd_triggered_events: ' + E);
                            }
                        }