function (playerState) {



                            //TODO: Implement desktop notifications.

                            // if(playerState.data == PlayerStates.PLAYING){

                            //     var nowPlayingNotification = webkitNotifications.createNotification(null, 'Now Playing', _currentSong.name);

                            //     nowPlayingNotification.ondisplay = function(){setTimeout(function(){nowPlayingNotification.cancel()}, 2000)};

                            //     nowPlayingNotification.show();

                            // }



                            //If the UI is closed we can't post a message to it -- so need to handle next song in background.

                            //The player can be playing in the background and UI changes may try and be posted to the UI, need to prevent.

                            if (playerState.data == PlayerStates.ENDED) {

                                if (_playlist.songCount() > 1)

                                    player.loadSongById(player.getNextSong().id);

                            }

                            else if(playerState.data == PlayerStates.VIDCUED){

                                //Don't leave the player in the VIDCUED state because it does not work well with seekTo.

                                //If the vid is cued (not playing) and the user seeks to the middle of the song it will start playing.

                                //If the vid is paused (not playing) and the user seeks to the middle of the song it will not start playing.

                                player.play();

                                player.pause();

                            }

                            else if (_port) {

                                _sendUpdate();

                            }

                        }