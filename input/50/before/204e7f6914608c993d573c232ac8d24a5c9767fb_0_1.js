function(index) {
        var _ = this._;
        index = _.segnoIndex[index]
        if (index !== undefined) {
            _.index = index;
        }
    }