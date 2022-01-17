function (event) {
            // handle translate on Touch devices only if initial touch was on the knob/handle
            if(!window.Touch || (window.Touch && this._touchOnHandle)) {
                var x = this._startPositionX + event.translateX - this._startTranslateX;
                if (x < 0) {
                    x = 0;
                } else {
                    if (x > this._sliderWidth) {
                        x = this._sliderWidth;
                    }
                }
                this._positionX = x;
            }
        }