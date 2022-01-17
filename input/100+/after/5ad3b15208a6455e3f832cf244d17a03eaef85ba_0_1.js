function (data) {
            console.log("=== in getSongIDFromTitle; received a response");
            var response = data.response;
            var songs = response.songs;
            if (songs && songs.length > 0) {
                var song = songs[0];
                console.log("=== looking for song: " + songTitle + " and got: " + song.id + " (" + song.title + ")");
                innerGeneratePlaylist(artist, song.id, song.title, artistHot, songHot, variety, false);
            } else {
                console.log("=== looking for song: " + songTitle + " and did not get any songs back!");
                alert("We can't find that song");
            }
        }