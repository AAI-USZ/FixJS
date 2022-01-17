function rmTrack(trackId, playlistName) {
        playlistName = playlistName || 'default';
        $.bootstrapMessageLoading();
        $.post('/playlist/rmtrack', {
            playlist: playlistName,
            trackId: trackId
        }, function(data) {
            $.bootstrapMessageAuto(data[0], data[1]);
            if('error' === data[1])
                loadPlaylist(playlistName);
        }, 'json');
    }