function() {
                            try {
                                var copy_ids = util.functional.map_list( obj.retrieve_ids2, function(o) { return o.copy_id; } ); 
                                for (var i = 0; i < copy_ids.length; i++) {
                                    xulG.new_tab(
                                        urls.XUL_TRIGGER_EVENTS,
                                        {},
                                        {
                                            'copy_id' : copy_ids[i]
                                        }
                                    );
                                }
                            } catch(E) {
                                alert('Error in copy_status.js, cmd_triggered_events: ' + E);
                            }
                        }