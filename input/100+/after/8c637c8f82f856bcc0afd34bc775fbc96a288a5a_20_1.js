function(){



    /**

     * @protected

     * @type {core.ConstraintLayout}

     */

    this.constraintLayout=null;



    /**

     * @protected

     * @type {Array}

     */

    this.pendingElements=[];



    /**

     * @override

     * @param {core.VisualComponent} element

     */

    this.addElement=function(element){

        try{

           this.getSkinPart('content').addElement(element);

        }catch(ex){

                this.pendingElements.push(element);

        }

    }



    /**

     * @override

     * @param {core.VisualComponent} element

     * @param {int} position

     */

    this.addElementAt=function(element,position){

        try{

            this.getSkinPart('content').addElementAt(element,position);

        }catch(ex){

            //if(ex['type']!=undefined && ex['type']=="core.exceptions.SkinException"){

                this.pendingElements.splice(position,0,element);

            //}else{

            //    throw ex;

            //}



        }



    }



    /**

     * @override

     * @param {core.VisualComponent} element

     */

    this.removeElement=function(element){

        this.getSkinPart('content').removeElement(element);

    }





    this.removeElementAt=function(position){

        this.getSkinPart('content').removeElementAt(position);

    }



    this.removeAllElements=function(){

        this.getSkinPart('content').removeAllElements();

    }



    this.getElementsNum=function(){

        return this.getSkinPart('content').getElementsNum();

    }



    this.getElementAt=function(position){

        return this.getSkinPart('content').getElementAt(position);

    }



    this.getElementIndex=function(element){

        return this.getSkinPart('content').getElementIndex(element);

    }





    this.partAdded=function(name,instance){

        if(name=='content'){

            if(this.constraintLayout==null) this.constraintLayout=this.createComponent('core.ConstraintLayout');

            this.redirectProperty('layout',instance,this.constraintLayout);

            for(var i in this.pendingElements){

                instance.addElement(this.pendingElements[i]);

            }

            this.pendingElements=[];

        }

    }



    this.partRemoved=function(name,instance){

        if(name=='content'){

            this.clearPropertyRedirection('layout');

            for(var i=0;i<instance.getElementsNum();i++){

                this.pendingElements.push(instance.getElementAt(i));

            }

            instance.removeAllElements();

        }

    }







    this.removeSkin=function(skin){

        this.callSuper('addElement',skin);

    }



    this.addSkin=function(skin){

        this.callSuper('addElement',skin);

    }



    this.createAttributes=function(){

        this.callSuper('createAttributes');

        this.declareSkinPart('content',true,'core.Container');

    }



    this.init=function(){

        this.callSuper('init');

        this.skinnableInit();

        for(var i in this.xmlContentArray){

            this.addElement(this.xmlContentArray[i]);

        }

    }



    this.tack=function(){

        this.callSuper('tack');

        this.skinnableTack();

    }



    this.measure=function(){

        var mW=this.measuredWidth;

        var mH=this.measuredHeight;

        this.skinnableMeasure();

        if ((mH!=this.measuredHeight || mW!=this.measuredWidth) && this.parent != null) {

            this.parent.invalidateLayout();

        }

    }





    this.commitProperties=function(){

        this.callSuper('commitProperties');

        this.skinnableCommitProperties();

    }





}