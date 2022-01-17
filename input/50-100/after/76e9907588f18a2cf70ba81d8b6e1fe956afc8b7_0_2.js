function(attr) {
        var type = this.getType();
        if (_(attr).isString()) {
            attr = type.fields[attr];
        }
        var data = _.extend({}, this, {descriptors: this.descriptors.concat([attr]), displayName: null});
        return new PathInfo(data);
    }