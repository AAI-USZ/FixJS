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
            transition,
            TRANS = ScrollView._TRANSITION,
            callback = this._boundScollEnded,
            duration = duration || 0,
            easing = easing || ScrollView.EASING;

        // Shouldn't set these values inside scrollTo
        // if (xSet) {
        //     this.set(SCROLL_X, x, { src: UI });
        // }

        // if (ySet) {
        //     this.set(SCROLL_Y, y, { src: UI });
        // }

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

            // TODO: Should use _moveTo()

            if (NATIVE_TRANSITIONS) {

                node.setStyle('transform', this._transform(xMove, yMove));

            } else {
                if (xSet) { node.setStyle(LEFT, xMove + PX); }
                if (ySet) { node.setStyle(TOP, yMove + PX); }
            }
        }
    }