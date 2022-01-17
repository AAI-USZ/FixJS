function(position){

        if(position>=0 && position<=this.elements.length){

            this.deactivateElement(this.elements[position]);

            this.elements[position].parent=null;

            this.elements[position].triggerEvent("parentChanged");

            this.elements.splice(position,1);

            this.triggerEvent('elementsPropertyChanged');

        }

    }