function() {
                            try {
                                var copy_ids = util.functional.map_list( obj.retrieve_ids, function(o) { return o.copy_id; } ); 
                                var barcodes = util.functional.map_list( obj.retrieve_ids, function(o) { return o.barcode; } ); 
                                for (var i = 0; i < copy_ids.length; i++) {
                                    xulG.new_tab(
                                        urls.XUL_TRIGGER_EVENTS,
                                        {
                                            'tab_name' : document.getElementById('commonStrings').getFormattedString('tab.label.triggered_events_for_copy',[ barcodes[i] ])
                                        },
                                        {
                                            'copy_id' : copy_ids[i]
                                        }
                                    );
                                }
                            } catch(E) {
                                alert('Error in items.js, cmd_triggered_events: ' + E);
                            }
                        }