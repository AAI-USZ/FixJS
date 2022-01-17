function(element){

        if(this.elements.indexOf(element)==-1){

            if(element.parent!=null){

                element.parent.removeElement(element);

            }

            this.elements.push(element);

            this.domElement.appendChild(element.domElement);

            this.activateElement(element);

            element.parent=this;

            element.triggerEvent("parentChanged");

        }else{

            this.elements.splice(this.getElementIndex(element),1);

            this.elements.push(element);

            this.domElement.appendChild(element.domElement);



        }

        this.triggerEvent('elementsPropertyChanged');

    }