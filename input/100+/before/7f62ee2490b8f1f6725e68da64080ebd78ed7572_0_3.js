function(ev, el, o) {
        el = Ext.get(el);

        if (this.running[el.id] === undefined) {
            return;
        }

        var style = el.dom.style,
            config = o.config,
            me = this,
            property;

        if (config.autoClear) {
            for (property in config.to) {
                if (!config.to.hasOwnProperty(property) || config[property] === false) {
                    continue;
                }
                style[property] = '';
            }
        }

        style.webkitTransitionDuration = null;
        style.mozTransitionDuration = null;
        style.webkitTransitionProperty = null;
        style.mozTransitionProperty = null;
        style.webkitTransitionTimingFunction = null;
        style.mozTransitionTimingFunction = null;

        if (config.is3d) {
            el.parent().setStyle({
                '-webkit-perspective': '',
                '-moz-perspective': '',
                '-webkit-transform-style': '',
                '-moz-transform-style': ''
            });
        }

        if (me.config.after) {
            me.config.after.call(config, el, config);
        }

        if (o.after) {
            o.after.call(config.scope || me, el, config);
        }

        delete me.running[el.id];
    }