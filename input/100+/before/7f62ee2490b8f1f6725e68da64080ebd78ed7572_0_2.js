function(el, config) {
        el = Ext.get(el);
        config = config || {};


        var me = this,
            style = el.dom.style,
            property,
            after = config.after;

        if (me.running[el.id]) {
            me.onTransitionEnd(null, el, {
                config: config,
                after: after
            });
        }

        config = this.initConfig(el, config);

        if (this.disableAnimations) {
            for (property in config.to) {
                if (!config.to.hasOwnProperty(property)) {
                    continue;
                }
                style[property] = config.to[property];
            }
            this.onTransitionEnd(null, el, {
                config: config,
                after: after
            });
            return me;
        }

        el.un('transitionend', me.onTransitionEnd, me);

        style.webkitTransitionDuration = '0ms';
        style.mozTransitionDuration = '0ms';
        for (property in config.from) {
            if (!config.from.hasOwnProperty(property)) {
                continue;
            }
            style[property] = config.from[property];
        }

        setTimeout(function() {
            // If this element has been destroyed since the timeout started, do nothing
            if (!el.dom) {
                return;
            }

            // If this is a 3d animation we have to set the perspective on the parent
            if (config.is3d === true) {
                el.parent().setStyle({
                    // See https://sencha.jira.com/browse/TOUCH-1498
                    '-webkit-perspective': '1200',
                    '-moz-perspective': '1200',
                    '-webkit-transform-style': 'preserve-3d',
                    '-moz-transform-style': 'preserve-3d'
                });
            }

            style.webkitTransitionDuration = config.duration + 'ms';
            style.mozTransitionDuration = config.duration + 'ms';
            style.webkitTransitionProperty = 'all';
            style.mozTransitionProperty = 'all';
            style.webkitTransitionTimingFunction = config.easing;
            style.mozTransitionTimingFunction = config.easing;

            // Bind our listener that fires after the animation ends
            el.on('transitionend', me.onTransitionEnd, me, {
                single: true,
                config: config,
                after: after
            });

            for (property in config.to) {
                if (!config.to.hasOwnProperty(property)) {
                    continue;
                }
                style[property] = config.to[property];
            }
        }, config.delay || 5);

        me.running[el.id] = config;
        return me;
    }