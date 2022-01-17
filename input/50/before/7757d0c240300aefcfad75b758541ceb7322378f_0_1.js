function(e) {
            url = $(this).parent().parent().find('.jp-playlist-item-free').attr('href');
            rmTrack(url, myPlaylist.name);
        }