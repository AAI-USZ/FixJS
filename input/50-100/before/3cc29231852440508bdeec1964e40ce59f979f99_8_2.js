function(event) {
            var elements = event.detail;

            if(Array.isArray(elements)) {
                elements.forEach(function(element) {
                    this.addElement(element);
                }, this);
            } else {
                this.addElement(elements);
            }

            this.drawWorkingPlane();
        }