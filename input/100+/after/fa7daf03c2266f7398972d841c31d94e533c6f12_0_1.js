function(obj, type, owner) {
        var i, len;
        if (owner['x_internal' + type]) {
            len = owner['x_internal' + type].length;

            for (i = len - 1; i >= 0; i--) {
                JXG.removeEvent(obj, type, owner['x_internal' + type][i].origin, owner);
            }

            if (owner['x_internal' + type].length > 0) {
                JXG.debug('removeAllEvents: Not all events could be removed.');
            }
        }
    }