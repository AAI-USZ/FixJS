function (message) {

            var playerState = message.playerState;

            switch (playerState) {

                case PlayerStates.ENDED:

                case PlayerStates.VIDCUED:

                case PlayerStates.PAUSED:

                    playerControls.setToggleMusicToPlay();

                    break;

                case PlayerStates.PLAYING:

                    //Volume only becomes available once a video has become cued or when popup reopens.

                    var volume = Player.getVolume();

                    playerControls.setVolume(volume);

                    playerControls.setToggleMusicToPause();

                    break;

            }



            var songs = message.songs;

            playerControls.setEnableToggleMusicButton(songs.length > 0);

            playerControls.setEnableSkipButton(songs.length > 1);

            playerControls.setEnableShuffleButton(songs.length > 1);



            var currentSong = message.currentSong;

            songList.reload(songs, currentSong);

            header.updateTitle(currentSong);



            var playlistTitle = Player.getPlaylistTitle();

            songsTab.setContentHeaderTitle(playlistTitle);

            playlistsTab.setContentHeaderTitle(playlistTitle)

            playlistsTab.reloadList();

        }