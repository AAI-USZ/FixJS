function() {
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
            style.MozTransitionDuration = config.duration + 'ms';
            style.webkitTransitionProperty = 'all';
            style.MozTransitionProperty = 'all';
            style.webkitTransitionTimingFunction = config.easing;
            style.MozTransitionTimingFunction = config.easing;

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
        }