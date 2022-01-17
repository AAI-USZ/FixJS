function(e, ui) {
                                    dialogEvent.open($dialog);
                                    if ($.isFunction(oldCallbacks.open)) {
                                        oldCallbacks.open.apply($dialog, arguments);
                                    }
                                }