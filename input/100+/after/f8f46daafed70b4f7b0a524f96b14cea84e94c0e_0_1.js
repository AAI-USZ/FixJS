function(shape, evt) {
        var isDragging = Kinetic.GlobalObject.drag.moving;
        var go = Kinetic.GlobalObject;
        var pos = this.getUserPosition();
        var el = shape.eventListeners;
        var that = this;

        if(this.targetShape && shape._id === this.targetShape._id) {
            this.targetFound = true;
        }

        if(shape.isVisible() && pos !== undefined && shape.intersects(pos)) {
            // handle onmousedown
            if(!isDragging && this.mouseDown) {
                this.mouseDown = false;
                this.clickStart = true;
                shape._handleEvent('mousedown', evt);
                return true;
            }
            // handle onmouseup & onclick
            else if(this.mouseUp) {
                this.mouseUp = false;
                shape._handleEvent('mouseup', evt);

                // detect if click or double click occurred
                if(this.clickStart) {
                    /*
                     * if dragging and dropping, don't fire click or dbl click
                     * event
                     */
                    if((!go.drag.moving) || !go.drag.node) {
                        shape._handleEvent('click', evt);

                        if(this.inDoubleClickWindow) {
                            shape._handleEvent('dblclick', evt);
                        }
                        this.inDoubleClickWindow = true;
                        setTimeout(function() {
                            that.inDoubleClickWindow = false;
                        }, this.dblClickWindow);
                    }
                }
                return true;
            }

            // handle touchstart
            else if(!isDragging && this.touchStart && !this.touchMove) {
                this.touchStart = false;
                this.tapStart = true;
                shape._handleEvent('touchstart', evt);
                return true;
            }
            // handle touchend & tap
            else if(this.touchEnd) {
                this.touchEnd = false;
                shape._handleEvent('touchend', evt);

                // detect if tap or double tap occurred
                if(this.tapStart) {
                    /*
                     * if dragging and dropping, don't fire tap or dbltap
                     * event
                     */
                    if((!go.drag.moving) || !go.drag.node) {
                        shape._handleEvent('tap', evt);

                        if(this.inDoubleClickWindow) {
                            shape._handleEvent('dbltap', evt);
                        }
                        this.inDoubleClickWindow = true;
                        setTimeout(function() {
                            that.inDoubleClickWindow = false;
                        }, this.dblClickWindow);
                    }
                }
                return true;
            }
            else if(!isDragging && this.touchMove) {
                shape._handleEvent('touchmove', evt);
                return true;
            }
            /*
            * NOTE: these event handlers require target shape
            * handling
            */
            // handle onmouseover
            else if(!isDragging && this._isNewTarget(shape, evt)) {
                /*
                 * check to see if there are stored mouseout events first.
                 * if there are, run those before running the onmouseover
                 * events
                 */
                if(this.mouseoutShape) {
                    this.mouseoverShape = shape;
                    this.mouseoutShape._handleEvent('mouseout', evt);
                    this.mouseoverShape = undefined;
                }

                shape._handleEvent('mouseover', evt);
                this._setTarget(shape);
                return true;
            }
            // handle mousemove and touchmove
            else {
                if(!isDragging && this.mouseMove) {
                    shape._handleEvent('mousemove', evt);
                    return true;
                }
            }

        }
        // handle mouseout condition
        else if(!isDragging && this.targetShape && this.targetShape._id === shape._id) {
            this._setTarget(undefined);
            this.mouseoutShape = shape;
            return true;
        }

        return false;
    }