function(evt) {
                            if (global_opts.autoFocus &&
                                (player.mode & C.M_HANDLE_EVENTS) &&
                                player.canvas) {
                                player.canvas.blur();
                            }
                            if (player.controls && 
                                (!player.controls.evtInBounds(evt))) {
                                player.controls.hide();
                            }
                            if (player.info &&
                                (!player.info.evtInBounds(evt))) {
                              player.info.hide(); 
                            }
                            return true;
                        }