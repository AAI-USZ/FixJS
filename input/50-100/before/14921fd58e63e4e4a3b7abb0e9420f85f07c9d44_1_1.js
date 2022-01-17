function(position) {
            var x = this._positionOfElement(this.element).x;
            var positionX = (position - (x + (this._handleWidth/2)));
            if(positionX < 0) {
                positionX = 0;
            }
            this._positionX = positionX;
        }