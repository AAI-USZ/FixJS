function() {
                            try {
                                var copy_ids = util.functional.map_list( obj.retrieve_ids2, function(o) { return o.copy_id; } ); 
                                for (var i = 0; i < copy_ids.length; i++) {
                                    xulG.new_tab(
                                        xulG.url_prefix(urls.XUL_REMOTE_BROWSER),
                                        {},
                                        {
                                            'url': urls.EG_TRIGGER_EVENTS + "?copy_id=" + copy_ids[i],
                                            'show_nav_buttons': false,
                                            'show_print_button': false
                                        }
                                    );
                                }
                            } catch(E) {
                                alert('Error in copy_status.js, cmd_triggered_events: ' + E);
                            }
                        }