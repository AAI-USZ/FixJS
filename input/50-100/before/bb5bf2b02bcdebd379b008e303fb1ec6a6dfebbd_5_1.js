function (event, ui) {

            //When the user selects a song suggestion the auto-complete source will change from suggestions to playable songs.

            event.preventDefault();



            if (_source == Source.TYPING_SUGGEST)

                _analyzeForSong(ui.item.value);

            else if (_source == Source.SONG_SUGGEST) {

                Player.addSongById(ui.item.value.videoId);

                _flashMessage('Thanks!', 2000);

            }

        }