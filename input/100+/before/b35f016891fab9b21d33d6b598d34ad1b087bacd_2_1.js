function() {
            this.tileLayer.width = Globals.board.width;
            this.tileLayer.height = Globals.board.height;

            this.effectLayer.width = Globals.board.width;
            this.effectLayer.height = Globals.board.height;

            this.renderer = CanvasRenderer.create().init(this.tileLayer, this.effectLayer);
            this.gameState.render = this.renderer;

            this.gameState.addEventListener("startRound", this, false);
            this.gameState.addEventListener("endRound", this, false);

            var self = this;

            this.effectLayer.addEventListener("mousedown", this, false);
            this.effectLayer.addEventListener("mousemove", this, false);
            document.addEventListener("mouseup", this, false);

            this.effectLayer.addEventListener("touchstart", this, false);
            this.effectLayer.addEventListener("touchmove", this, false);
            document.addEventListener("touchend", this, false);
            
            /*this.effectLayer.ontouchstart = function(event) { that.on_touch_down(event); return false; }
            this.effectLayer.ontouchmove = function(event) { that.on_touch_move(event, false); return false; } 
            document.ontouchend = function(event) { that.on_input_end(); return false; }
            
            this.effectLayer.addEventListener( 'MozTouchDown', function(event) { 
                that.on_mouse_down(event); return false; 
            }, false );
            
            this.effectLayer.addEventListener( 'MozTouchMove', function(event) { 
                that.on_mouse_move(event, false); return false; 
            }, false );
            
            document.addEventListener( 'MozTouchUp', function(event) { 
                that.on_input_end(); return false; 
            }, false );*/
        }