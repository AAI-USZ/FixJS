function() {
        if (this.isRoot()) {
            throw "Root paths do not have a parent";
        }
        var data = _.extend({}, this, {descriptors: _(this.descriptors).initial()});
        return new PathInfo(data);
    }