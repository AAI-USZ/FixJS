function(clip)
        {
            Log('debug', 'Starting flowplayer');
            _player = Flowplayer(player_div[0]  , {
                src: 'assets/swf/flowplayer.commercial-3.2.11.swf',
                wmode: 'opaque'
            }, {
                key: '#$671186fa04a44f30376',
                onBeforePause: function() {
                    return true;
                },
                onBegin: function () {
                    this.setVolume(_this.getVolume());
                },
                onFinish: function() {
                    return false;
                },
                onError: function() {
                    Log('error', 'Could not play ' + (clip.isLive? 'live' : 'recorded') + ' stream', clip);
                    if (clip.isLive) {
                        _this.playRecordedLive(clip.streamId);
                    }
                },
                onEnded: null,
                clip: clip,
                play: {
                    label: 'Start',
                    replayLabel: 'Replay'
                },
                plugins: {
                    rtmp: {
                        url: "flowplayer.rtmp-3.2.10.swf"
                    },
                    controls: null,
                },

                canvas: {
                        background: '#B70600 no-repeat 30 10',
                        backgroundGradient: 'none'
                }
            }).controls('controls');
            
            $('.controls').append($('#volume'));
            $('.controls').append($('#upvote'));
            $('.controls').append($('#downvote'));

        }