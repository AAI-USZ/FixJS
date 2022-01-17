function(event, first) {
            if(this.inputActive) {
                var target = event.target;
                var x = event.touches[0].pageX - this._element.offsetLeft;
                var y = event.touches[0].pageY - this._element.offsetTop;
                
                this.gameState.addPoint(x, y, first);
                
                event.preventDefault();
                return false;
            }
        }