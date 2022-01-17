function() {
            this._sliderWidth = this.element.offsetWidth - (1.5*InputRange.HANDLE_ADJUST);
            //var x = this._positionOfElement(this.element).x;
            var x = this._getElementPosition(this.element).left;
            if(x > 0) {
                this._sliderLeft = x;
            }
            //console.log('willDraw element position', this._sliderLeft, this._sliderWidth);
            if(!this._valueSyncedWithPosition) {
                this._calculatePositionFromValue();
            }

        }