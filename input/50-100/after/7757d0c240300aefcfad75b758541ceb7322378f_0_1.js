function(data) {
            $.bootstrapMessageAuto(data[0], data[1]);
            if('error' === data[1])
                loadPlaylist(myPlaylist.name);
            else if('success' === data[1]) {
                var v = data[2];
                var pOpt = {title: v.title, mp3: v.url, free: true, id: v.fid, trackId: v.trackId}; // TODO: verify this.
                myPlaylist.add(pOpt, playNow);
            }
        }