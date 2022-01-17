function(evt) {
        var date = new Date();
        var time = date.getTime();
        this.lastEventTime = time;

        var go = Kinetic.Global;
        if(!evt) {
            evt = window.event;
        }

        this._setMousePosition(evt);
        this._setTouchPosition(evt);
        this.pathCanvas.clear();

        /*
         * loop through layers.  If at any point an event
         * is triggered, break out
         */
        this.targetFound = false;
        var shapeDetected = false;
        for(var n = this.children.length - 1; n >= 0; n--) {
            var layer = this.children[n];
            if(layer.isVisible() && n >= 0 && layer.getListening()) {
                if(this._traverseChildren(layer, evt)) {
                    shapeDetected = true;
                    break;
                }
            }
        }

        /*
         * if no shape was detected and a mouseout shape has been stored,
         * then run the onmouseout event handlers
         */
        if(!shapeDetected && this.mouseoutShape) {
            this.mouseoutShape._handleEvent('mouseout', evt);
            this.mouseoutShape = undefined;
        }
    }