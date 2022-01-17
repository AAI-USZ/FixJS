function(){



    this.formItemInit=function(){

        this.createEventListener('labelPropertyChanged',this._refreshLabel,this);

    }



    /**

     * Label node

     * @type {HTMLLabelElement}

     */

    this.labelNode=null;



    this.validate=function(){

        return this.doValidation();

    }



    this.doValidation=function(){

        return true;

    }



    this._refreshLabel=function(event){

        if(this.labelNode!=null){

            this.labelNode.innerHTML=this.getLabel();

        }

    }

}