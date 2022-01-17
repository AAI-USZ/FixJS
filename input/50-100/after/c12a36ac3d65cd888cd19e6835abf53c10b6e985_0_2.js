function() {
            if(!this._handleWidth) {
                this._handleWidth = this._handleEl.offsetWidth;
            }
            this._sliderWidth = this.element.offsetWidth - (1.5*(this._handleWidth/2));
            if(!this._valueSyncedWithPosition) {
                this._calculatePositionFromValue();
            }
        }