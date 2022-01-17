function(node, name, options, cb) {
    
    if(node instanceof HTMLElement) {
        node = Y.Node.one(node);
    }

    var sim = new Y.GestureSimulation(node);
    name = name.toLowerCase();
    
    if(!cb && Y.Lang.isFunction(options)) {
        cb = options;
        options = {};
    }
    
    options = options || {};

    if (gestureNames[name]) {
        switch(name) {
            // single-touch: point gestures 
            case 'tap':
                sim.tap(cb, options.point, options.times, options.hold, options.delay);
                break;
            case 'doubletap':
                sim.tap(cb, options.point, 2);
                break;
            case 'press':
                if(!Y.Lang.isNumber(options.hold)) {
                    options.hold = DEFAULTS.HOLD_PRESS;
                } else if(options.hold < DEFAULTS.MIN_HOLD_PRESS) {
                    options.hold = DEFAULTS.MIN_HOLD_PRESS;
                } else if(options.hold > DEFAULTS.MAX_HOLD_PRESS) {
                    options.hold = DEFAULTS.MAX_HOLD_PRESS;
                }
                sim.tap(cb, options.point, 1, options.hold);
                break;

            // single-touch: move gestures 
            case 'move':
                sim.move(cb, options.path, options.duration);
                break;
            case 'flick':
                sim.flick(cb, options.point, options.axis, options.distance, 
                    options.duration);
                break;

            // multi-touch: pinch/rotation gestures
            case 'pinch':
                sim.pinch(cb, options.center, options.r1, options.r2, 
                    options.duration, options.start, options.rotation);
                break;    
            case 'rotate':
                sim.rotate(cb, options.center, options.r1, options.r2, 
                    options.duration, options.start, options.rotation);
                break;
        }
    } else {
        Y.error(NAME+': Not a supported gesture simulation: '+name);
    }
}