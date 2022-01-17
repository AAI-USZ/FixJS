function(err, o) {
        that.tilejson(o);
        if (callback) callback(err, this);
    }