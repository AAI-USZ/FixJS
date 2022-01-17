function() {
                var i = 0;
                for (i; i < playlist.videos.length; i += 1) {
                    if (playlist.videos[i] === originalTrack) {
                        playlist.videos.splice(i, 1, self);
                        playlist.synced = false;
                        playlist.sync();
                        self.listView.insertAfter(originalTrack.listView);
                        originalTrack.listView.remove();
                    }
                }
            }