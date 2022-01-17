function (data) {

            var songName = data.entry.title.$t;



            YTHelper.search(songName, function (videos) {

                var playableSong = null;

                for (var videoIndex = 0; videoIndex < videos.length; videoIndex++) {

                    if (YTHelper._isVideoPlayable(videos[videoIndex])) {

                        playableSong = videos[videoIndex];

                        break;

                    }

                }



                callback(playableSong);

            });

        }