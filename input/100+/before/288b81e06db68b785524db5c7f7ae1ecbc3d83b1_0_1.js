function(e) {
            var mousePoint = webkitConvertPointFromPageToNode(this.element, new WebKitPoint(e.pageX, e.pageY));
            var overHud = false;
            this.hudRepeater.childComponents.forEach(function(obj) {
                if(obj.x < mousePoint.x && (obj.x + obj.element.offsetWidth) > mousePoint.x) {
                    if(obj.y < mousePoint.y && (obj.y + obj.element.offsetHeight) > mousePoint.y) {
                        overHud = true;
                        if(this._isDrawingConnection) {
                            obj.isOverScroller(e);
                        }
                    }
                }
            }.bind(this));
            if(typeof (this.objectsTray.element) !== "undefined") {
                if (this.objectsTray.element.offsetLeft < mousePoint.x && (this.objectsTray.element.offsetLeft + this.objectsTray.element.offsetWidth) > mousePoint.x ) {
                    if(this.objectsTray.element.parentElement.offsetTop < mousePoint.y && (this.objectsTray.element.parentElement.offsetTop + this.objectsTray.element.offsetHeight) > mousePoint.y) {
                        overHud = true;
                    }
                }
            }
            this.mouseOverHud = overHud;
            if(this._isDrawingConnection && !overHud) {
                //NOTE : Continue This content. mouse over select
                var obj = this.application.ninja.stage.getElement(event, true);
                if (obj && obj !== this.selectedElement)
                {
                    if (!obj.controller || obj === null)
                    {
                        if(this._targetedElement)
                        {
                            this._targetedElement.classList.remove("active-element-outline");
                            this.boundComponents.pop();
                            this._targetedElement = null;
                        }
                    }
                    else
                    {
                        if (obj !== this._targetedElement)
                        {
                            if(this._targetedElement)
                            {
                                this._targetedElement.classList.remove("active-element-outline");
                                this.boundComponents.pop();
                            }
                            this._targetedElement = obj;
                            this._targetedElement.classList.add("active-element-outline");
                            this.boundComponents.push(this._targetedElement);
                        }
                    }
                }
            }
            if(this._isDrawingConnection) {
                this._currentMousePosition = mousePoint;
                this.needsDraw = true;
            }
        }