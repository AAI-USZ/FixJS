function(evt) {
                            if (player.controls) {
                                player.controls.show();
                                player.controls.render(player.state, 
                                                       player.state.time);
                            }
                            if (player.info) player.info.show(); 
                            return true;
                        }