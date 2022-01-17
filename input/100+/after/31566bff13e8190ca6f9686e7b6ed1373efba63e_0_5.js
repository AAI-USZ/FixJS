function(attrs, prop, val, obj, rootObj) {
        var config = this.config;
        var node = this.node;
        var easing = config.easing;
        if(easing === undefined) {
            easing = 'linear';
        }

        var tween = new Kinetic.Tween(node, function(i) {
            obj[prop] = i;
            node.setAttrs(rootObj);
        }, Kinetic.Tweens[easing], attrs[prop], val, config.duration);

        return tween;
    }