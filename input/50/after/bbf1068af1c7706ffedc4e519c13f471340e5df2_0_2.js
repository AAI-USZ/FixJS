function(e) {

            var target = e.targetTouches[0];
            // handle the translate only if touch target is the knob
            this._touchOnHandle = (target.target === this._handleEl);
        }