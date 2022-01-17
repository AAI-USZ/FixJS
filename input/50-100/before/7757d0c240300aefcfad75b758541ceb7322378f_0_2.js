function rmTrack(url, playlistName) {
        playlistName = playlistName || 'default';
        $.bootstrapMessageLoading();
        $.post('/playlist/rmtrack', {
            playlist: playlistName,
            url: url
        }, function(data) {
            $.bootstrapMessageAuto(data[0], data[1]);
            if('error' === data[1])
                loadPlaylist(playlistName);
        }, 'json');
    }