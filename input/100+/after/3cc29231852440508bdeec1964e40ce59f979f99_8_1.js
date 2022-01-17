function(event) {
            var elements = event.detail;

            if(Array.isArray(elements)) {
                elements = Array.prototype.slice.call(elements, 0);
                elements.forEach(function(element) {
                    this.removeElement(element);
                }, this);
            } else {
                this.removeElement(elements);
            }

            // Redraw stage only once after all deletion is completed
            var stage = this.application.ninja.stage;
            stage.drawLayout = true;
            stage.updatePlanes = true;
            stage.draw3DInfo = true;
            stage.needsDrawSelection = true;
        }