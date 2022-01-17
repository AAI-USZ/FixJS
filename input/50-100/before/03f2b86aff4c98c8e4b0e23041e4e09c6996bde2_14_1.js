function (event, ui) {

            //Selected value is a string when providing song suggestions and a song object when selecting a video to add.

            //When the user selects a song suggestion the auto-complete source will change from suggestions to playable songs.

            if(typeof(ui.item.value) == 'string'){

                _showSongSuggestions(ui.item.value);

            }

            else {

                event.preventDefault(); //Don't change the text when user clicks their song selection.

                Player.addSongById(ui.item.value.videoId);

                songListHeader.flashMessage('Thanks!', 2000);

            }

        }