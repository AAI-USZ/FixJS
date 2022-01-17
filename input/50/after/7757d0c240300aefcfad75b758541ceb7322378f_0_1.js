function(e) {
            trackId = $(this).parent().parent().find('.jp-playlist-item-free').attr('trackId');
            rmTrack(trackId, myPlaylist.name);
        }