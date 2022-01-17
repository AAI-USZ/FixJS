function(evt) {
                            if (global_opts.autoFocus &&
                                (player.mode & C.M_HANDLE_EVENTS) &&
                                player.canvas) {
                                player.canvas.focus();
                            }
                            if (player.controls) {
                                player.controls.show();
                                player.controls.render(player.state, 
                                                       player.state.time);
                            }
                            if (player.info) player.info.show(); 
                            return true;
                        }