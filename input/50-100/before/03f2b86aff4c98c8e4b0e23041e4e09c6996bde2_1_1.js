function (id) {

        var songIndex = -1;

        for (var i = 0; i < _songs.length; i++) {

            if (_songs[i].id === id) {

                songIndex = i;

                break;

            }

        }



        if (songIndex == -1)

            throw "Couldn't find song with UID: " + id;



        return songIndex;

    }