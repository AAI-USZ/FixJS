function (id) {

        var playlistIndex = -1;

        for (var i = 0; i < playlists.length; i++) {

            if (playlists[i].id === id) {

                playlistIndex = i;

                break;

            }

        }



        if (playlistIndex == -1)

            throw "Couldn't find playlist with UID: " + id;



        return playlistIndex;

    }