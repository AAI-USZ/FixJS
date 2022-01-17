function(){

    extend(this,'core.VisualComponent');



    this.elements=[];



    this.getElementsNum=function(){

        return this.elements.length;

    }



    /**

     *

     * @param position

     * @return {core.VisualComponent}

     */

    this.getElementAt=function(position){

        return this.elements[position];

    }



    this.getElementIndex=function(element){

        return this.elements.indexOf(element);

    }



    this.removeElement=function(element){

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



    this.removeElementAt=function(position){

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



    this.removeAllElements=function(){

        for(var i in this.elements){

            this.deactivateElement(this.elements[i]);

            this.elements[i].parent=null;

            this.elements[i].triggerEvent("parentChanged");

        }

        this.elements=[];

        this.triggerEvent('elementsPropertyChanged');

    }





    this.addElement=function(element){

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



    this.addElementAt=function(element,position){

        if(this.elements.indexOf(element)==-1){

            if(element.parent!=null){

                element.parent.removeElement(element);

            }

            if(position<this.elements.length-1){

                this.domElement.insertBefore(this.elements[position+1].domElement,element.domElement);

            }else{

                this.domElement.appendChild(element.domElement);

            }

            this.elements.splice(position,0,element);

            this.activateElement(element);

            element.parent=this;

            element.triggerEvent("parentChanged");

        }else{

            this.elements.splice(this.getElementIndex(element),1);

            this.elements.splice(position,0,element);

            if(position<this.elements.length-1){

                this.domElement.insertBefore(this.elements[position+1].domElement,element.domElement);

            }else{

                this.domElement.appendChild(element.domElement);

            }

        }

        this.triggerEvent('elementsPropertyChanged');

    }







    this.init=function(){

        this.callSuper('init');

        for(var i in this.xmlContentArray){

            this.addElement(this.xmlContentArray[i]);

        }

        this.createEventListener('elementsPropertyChanged',this.elementsChanged,this);

        this.createEventListener('layoutPropertyChanged',this.invalidateLayout,this);

        this.elementsChanged({});

    }



    this.elementsChanged=function(event){

        this.invalidateLayout();

    }



    this.activateElement=function(element){

        element.createEventListener('sizeChanged',this.invalidateLayout,this);

        element.createEventListener('positionChanged',this.invalidateLayout,this);

    }



    this.deactivateElement=function(element){

        element.removeEventListener('sizeChanged',this);

        element.removeEventListener('positionChanged',this);

    }



    this.refreshLayout=function(){

        if(this.getLayout()==null) this.layout=this.createComponent('core.ConstraintLayout');

        this.layout.doLayout(this);

    }

    this.layoutInvalid=false;



    this.invalidateLayout=function(){

        this.invalidateDisplayList();

        this.layoutInvalid=true;

    }



    this.measure=function(predictedWidth,predictedHeight){

        var mW=this.measuredWidth;

        var mH=this.measuredHeight;

        this.callSuper('measure',predictedWidth,predictedHeight);

        if(this.measuredHeight!=mH || this.measuredWidth!=mW){

            this.invalidateLayout();

        }

    }



    this.tack=function(){

        if(this.componentInvalid){

            this.callSuper('tack');

            if(this.layoutInvalid){

                this.refreshLayout();

                this.layoutInvalid=false;

            }

            for(var i in this.elements){

                this.elements[i].tack();

            }

        }

    }

}