function(index) {
        var _ = this._;
        var track = _.tracks[_.selected];
        if (track) {
            track.segno(index);
        }
    }