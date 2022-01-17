function (currentSong) {

            var text = currentSong ? currentSong.name : _defaultCaption;

            _title.text(text);

        }