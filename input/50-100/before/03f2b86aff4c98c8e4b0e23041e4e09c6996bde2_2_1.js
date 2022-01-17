function (id) {

        var playlistIndex = -1;

        for (var i = 0; i < _playlists.length; i++) {

            if (_playlists[i].id === id) {

                playlistIndex = i;

                break;

            }

        }



        if (playlistIndex == -1)

            throw "Couldn't find playlist with UID: " + id;



        return playlistIndex;

    }