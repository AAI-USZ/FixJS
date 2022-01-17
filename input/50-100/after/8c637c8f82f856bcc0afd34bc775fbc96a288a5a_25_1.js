function(element){

        if(this.getElementIndex(element)!=-1){

            if(this.domElement==element.domElement.parentNode){

                this.domElement.removeChild(element.domElement);

            }

            this.elements.splice(this.elements.indexOf(element),1);

            this.deactivateElement(element);

            element.parent=null;

            element.triggerEvent("parentChanged");

            this.triggerEvent('elementsPropertyChanged');

        }

    }