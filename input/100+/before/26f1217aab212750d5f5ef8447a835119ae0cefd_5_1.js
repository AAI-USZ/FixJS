function() {
                            try {
                                for (var i = 0; i < obj.selection_list.length; i++) {
                                    xulG.new_tab(
                                        urls.XUL_TRIGGER_EVENTS,
                                        {
                                            'tab_name' : document.getElementById('commonStrings').getFormattedString('tab.label.triggered_events_for_copy',[ obj.selection_list[i].barcode ])
                                        },
                                        {
                                            'copy_id' : obj.selection_list[i].copy_id
                                        }
                                    );
                                }
                            } catch(E) {
                                alert('Error in copy_status.js, cmd_triggered_events: ' + E);
                            }
                        }