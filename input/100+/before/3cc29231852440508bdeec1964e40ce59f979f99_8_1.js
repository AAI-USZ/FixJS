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

            this.drawWorkingPlane();
        }