function(eventType, evt) {
        if(this.nodeType === 'Shape') {
            evt.shape = this;
        }

        var stage = this.getStage();
        var mover = stage ? stage.mouseoverShape : null;
        var mout = stage ? stage.mouseoutShape : null;
        var el = this.eventListeners;
        var okayToRun = true;

        /*
         * determine if event handler should be skipped by comparing
         * parent nodes
         */
        if(eventType === 'mouseover' && mout && mout._id === this._id) {
            okayToRun = false;
        }
        else if(eventType === 'mouseout' && mover && mover._id === this._id) {
            okayToRun = false;
        }

        if(okayToRun) {
            if(el[eventType]) {
                var events = el[eventType];
                for(var i = 0; i < events.length; i++) {
                    events[i].handler.apply(this, [evt]);
                }
            }

            if(stage && mover && mout) {
                stage.mouseoverShape = mover.parent;
                stage.mouseoutShape = mout.parent;
            }

            // simulate event bubbling
            if(!evt.cancelBubble && this.parent) {
                this._handleEvent.call(this.parent, eventType, evt);
            }
        }
    }