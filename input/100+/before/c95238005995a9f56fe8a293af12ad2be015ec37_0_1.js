function(array, obj) {
        var idx = _.indexOf(array, obj);
        if (idx >= -1) {
            array.splice(idx, 1);
        }
    }