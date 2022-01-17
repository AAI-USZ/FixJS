function(ev) {
                            obj.right_deck.set_iframe(
                                xulG.url_prefix(urls.XUL_REMOTE_BROWSER),
                                {},
                                {
                                    'url': urls.EG_TRIGGER_EVENTS + "?patron_id=" + obj.patron.id(),
                                    'show_print_button': false,
                                    'show_nav_buttons': false
                                }
                            );
                        }