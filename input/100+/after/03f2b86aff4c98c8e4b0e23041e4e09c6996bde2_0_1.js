function () {

            var frameID = getFrameID("MusicHolder");

            if (frameID) {

                player = new YT.Player(frameID, {

                    events: {

                        "onReady": function () {

                            //player functionality not available until ready   

                            ready = true;



                            //If there is a song to cue might as well have it ready to go.

                            if (playlist.songCount() > 0){

                                var defaultSongId = playlist.getSongs()[0].id;

                                cueSongById(defaultSongId);

                            }

                        },

                        "onStateChange": function (playerState) {



                            //TODO: Implement desktop notifications.

                            // if(playerState.data == PlayerStates.PLAYING){

                            //     var nowPlayingNotification = webkitNotifications.createNotification(null, 'Now Playing', currentSong.name);

                            //     nowPlayingNotification.ondisplay = function(){setTimeout(function(){nowPlayingNotification.cancel()}, 2000)};

                            //     nowPlayingNotification.show();

                            // }



                            //If the UI is closed we can't post a message to it -- so need to handle next song in background.

                            //The player can be playing in the background and UI changes may try and be posted to the UI, need to prevent.

                            if (playerState.data === PlayerStates.ENDED) {

                                if (playlist.songCount() > 1){

                                    player.loadSongById(player.getNextSong().id);  

                                }

                            }

                            else if(playerState.data === PlayerStates.VIDCUED){

                                //Don't leave the player in the VIDCUED state because it does not work well with seekTo.

                                //If the vid is cued (not playing) and the user seeks to the middle of the song it will start playing.

                                //If the vid is paused (not playing) and the user seeks to the middle of the song it will not start playing.

                                playVideo();

                                pauseVideo();

                            }

                            else if (port) {

                                sendUpdate();

                            }

                        },

                        "onError": function (error) {

                            switch (error.data) {

                                case 2:

                                    sendUpdate("Request contains an invalid parameter. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.");

                                    break;

                                case 100:

                                    sendUpdate("Video requested is not found. This occurs when a video has been removed (for any reason), or it has been marked as private.");

                                    break;

                                case 101:

                                case 150:

                                    sendUpdate("Video requested does not allow playback in the embedded players");

                                    break;

                                default:

                                    sendUpdate("I received an error and I don't know what happened!");

                                    break;

                            }

                        }

                    }

                });

            }

        }