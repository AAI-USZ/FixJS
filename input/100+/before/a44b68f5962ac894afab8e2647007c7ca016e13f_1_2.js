function(x, y, duration, easing, node) {
        
        if (this._cDisabled) {
            return;
        }

        var sv = this,
            cb = sv._cb,
            node = node || cb,
            xSet = (x !== null),
            ySet = (y !== null),
            xMove = (xSet) ? x * -1 : 0,
            yMove = (ySet) ? y * -1 : 0,
            TRANS = ScrollView._TRANSITION,
            callback = sv._boundScollEnded,
            duration = duration || 0,
            easing = easing || ScrollView.EASING,
            transition;

        if (NATIVE_TRANSITIONS) {
            // ANDROID WORKAROUND - try and stop existing transition, before kicking off new one.
            node.setStyle(TRANS.DURATION, ZERO).setStyle(TRANS.PROPERTY, EMPTY);
        }

        if (duration !== 0) {
            transition = {
                easing : easing,
                duration : duration/1000
            };

            if (NATIVE_TRANSITIONS) {
                transition.transform = this._transform(xMove, yMove);
            } else {
                if (xSet) { transition.left = xMove + PX; }
                if (ySet) { transition.top = yMove + PX; }
            }

            if (!callback) {
                callback = this._boundScollEnded = Y.bind(this._onTransEnd, this);
            }

            node.transition(transition, callback);
        } else {
            sv._moveTo(node, xMove, yMove);
        }
    }