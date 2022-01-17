function(stream_id)
        {
            Log('debug', 'Playing recorded');
            mixpanel.track('play-recorded');
            init_player({
                provider: 'rtmp',
                netConnectionUrl: 'rtmp://recorded.stream.tapin.tv/cfx/st/',
                url: 'mp4:' + stream_id + '/stream',
                isLive: false,
                streamId: stream_id
            });
        }