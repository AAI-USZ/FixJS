function(ev) {
                            obj.right_deck.set_iframe(
                                urls.XUL_TRIGGER_EVENTS,
                                {},
                                {
                                    'patron_id' : obj.patron.id()
                                }
                            );
                        }