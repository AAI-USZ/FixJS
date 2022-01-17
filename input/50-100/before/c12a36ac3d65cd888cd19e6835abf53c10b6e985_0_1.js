function(position) {
            if(this._sliderLeft <= 0) {
                var x = this._getElementPosition(this.element).left;
                if(x > 0) {
                    this._sliderLeft = x;
                }
            }
            var positionX = (position - (this._sliderLeft + InputRange.HANDLE_ADJUST));
            if(positionX < 0) {
                positionX = 0;
            }
            this._positionX = positionX;
        }