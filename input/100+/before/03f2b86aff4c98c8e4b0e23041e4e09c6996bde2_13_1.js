function (message) {

            var playerState = message.playerState;

            switch (playerState) {

                case PlayerStates.ENDED:

                case PlayerStates.VIDCUED:

                case PlayerStates.PAUSED:

                    _playerControls.setToggleMusicToPlay();

                    break;

                case PlayerStates.PLAYING:

                    //Volume only becomes available once a video has become cued or when popup reopens.

                    var volume = Player.getVolume();

                    _playerControls.setVolume(volume);

                    _playerControls.setToggleMusicToPause();

                    break;

            }



            var songs = message.songs;

            _playerControls.setEnableToggleMusicButton(songs.length > 0);

            _playerControls.setEnableSkipButton(songs.length > 1);

            _playerControls.setEnableShuffleButton(songs.length > 1);



            var currentSong = message.currentSong;

            _songList.reload(songs, currentSong);

            _header.updateTitle(currentSong);



            var playlistTitle = Player.getPlaylistTitle();

            _songsTab.setContentHeaderTitle(playlistTitle);

            _playlistsTab.setContentHeaderTitle(playlistTitle)

            _playlistsTab.reloadList();

        }