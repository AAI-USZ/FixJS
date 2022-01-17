function(evt) { 
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