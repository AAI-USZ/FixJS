function() {
                    Log('error', 'Could not play ' + (clip.isLive? 'live' : 'recorded') + ' stream', clip);
                    if (clip.isLive) {
                        _this.playRecordedLive(clip.streamId);
                    } else {
                        player_div.html('<img src="assets/img/viderror.png" />')
                    }
                }