function(key, prop, val) {
        var config = this.config;
        var node = this.node;
        var easing = config.easing;
        if(easing === undefined) {
            easing = 'linear';
        }

        var tween = new Kinetic.Tween(node, function(i) {
            key[prop] = i;
        }, Kinetic.Tweens[easing], key[prop], val, config.duration);

        return tween;
    }