function(position, selectable) {
            var point, element,
                docView = this.currentDocument.model.views.design;

            point = webkitConvertPointFromPageToNode(this.canvas, new WebKitPoint(position.pageX - docView.iframe.contentWindow.pageXOffset + this.documentOffsetLeft, position.pageY - docView.iframe.contentWindow.pageYOffset + this.documentOffsetTop));
            element = this.currentDocument.model.views.design.getElementFromPoint(point.x - this.userContentLeft,point.y - this.userContentTop);

            if(!element) {
                return this.currentDocument.model.domContainer;
            }
            // workaround Chrome 3d bug
            if(this.application.ninja.toolsData.selectedToolInstance._canSnap && this.currentDocument.inExclusion(element) !== -1) {
                point = webkitConvertPointFromPageToNode(this.canvas, new WebKitPoint(position.pageX, position.pageY));
                element = this.getElementUsingSnapping(point);
            }

            if(selectable) {

                if(this.currentDocument.inExclusion(element) !== -1) {
                    return this.currentDocument.model.domContainer;
                }

                var activeContainerId = this.currentDocument.model.domContainer.uuid;
                if(element.parentNode.uuid === activeContainerId) {
                    return element;
                } else {
                    var outerElement = element.parentNode;

                    while(outerElement.parentNode && outerElement.parentNode.uuid !== activeContainerId) {
                        // If element is higher up than current container then return
                        if(outerElement.id === "UserContent") return;
                            // else keep going up the chain
                            outerElement = outerElement.parentNode;
                        }

                    return outerElement;
                }

            } else {
                return element;
            }
        }