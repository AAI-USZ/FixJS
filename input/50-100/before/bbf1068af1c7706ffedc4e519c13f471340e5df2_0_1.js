function (event) {
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