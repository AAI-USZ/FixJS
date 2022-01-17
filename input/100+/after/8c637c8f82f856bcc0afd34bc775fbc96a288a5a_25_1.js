function(position){

        if(position>=0 && position<=this.elements.length){

            if(this.domElement==this.elements[position].domElement.parentNode){

                this.domElement.removeChild(this.elements[position].domElement);

            }

            this.deactivateElement(this.elements[position]);

            this.elements[position].parent=null;

            this.elements[position].triggerEvent("parentChanged");

            this.elements.splice(position,1);

            this.triggerEvent('elementsPropertyChanged');

        }

    }