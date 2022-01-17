function() {
            if(!this._handleWidth) {
                this._handleWidth = this._handleEl.offsetWidth;
            }
            this._sliderWidth = this.element.offsetWidth - (1.5*(this._handleWidth/2));
            if(this._clickTarget) {
                // the slider scale was clicked
                var x = dom.convertPointFromNodeToPage(this.element).x;
                var positionX = (this._clickTarget.x - (x + (this._handleWidth/2)));
                if(positionX < 0) {
                    positionX = 0;
                }
                this._positionX = positionX;
                this._clickTarget = null;
            }
            if(!this._valueSyncedWithPosition) {
                this._calculatePositionFromValue();
            }
        }