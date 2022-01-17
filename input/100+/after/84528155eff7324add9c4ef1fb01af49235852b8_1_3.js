function(canvas) {
    // TODO: move to _checkMode?
    this.canvas.addEventListener('mouseover', (function(player) { 
                        return function(evt) {
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
                        };
                    })(this), false);
    this.canvas.addEventListener('mouseout', (function(player) { 
                        return function(evt) {
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
                        };
                    })(this), false);
}