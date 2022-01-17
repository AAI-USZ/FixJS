function() {
                            try {
                                var copy_ids = util.functional.map_list( obj.retrieve_ids, function(o) { return o.copy_id; } ); 
                                var barcodes = util.functional.map_list( obj.retrieve_ids, function(o) { return o.barcode; } ); 
                                for (var i = 0; i < copy_ids.length; i++) {
                                    xulG.new_tab(
                                        xulG.url_prefix(urls.XUL_REMOTE_BROWSER),
                                        {
                                            'tab_name' : document.getElementById('commonStrings').getFormattedString('tab.label.triggered_events_for_copy',[ barcodes[i] ])
                                        },
                                        {
                                            'url': urls.EG_TRIGGER_EVENTS + "?copy_id=" + copy_ids[i],
                                            'show_nav_buttons': false,
                                            'show_print_button': false
                                        }
                                    );
                                }
                            } catch(E) {
                                alert('Error in items.js, cmd_triggered_events: ' + E);
                            }
                        }