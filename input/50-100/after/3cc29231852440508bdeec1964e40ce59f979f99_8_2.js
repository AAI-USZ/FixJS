function(event) {
            var elements = event.detail;

            if(Array.isArray(elements)) {
                elements.forEach(function(element) {
                    this.addElement(element);
                }, this);
            } else {
                this.addElement(elements);
            }

            // Redraw stage only once after all addition is completed
            var stage = this.application.ninja.stage;
            stage.drawLayout = true;
            stage.updatePlanes = true;
            stage.draw3DInfo = true;
            stage.needsDrawSelection = true;
        }