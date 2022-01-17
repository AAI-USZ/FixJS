function(){



    this.createAttributes=function(){

        this.callSuper('createAttributes');

        this.buttonCreateAttributes();

    }



    this.init=function(){

        this.callSuper('init');

        this.buttonInit();

        this.focusableInit();

        this.setSkinClass('core.skins.ButtonSkin');

        this.setWidth('90px');

        this.setHeight('23px');

        this.createEventListener('labelPropertyChanged',this.updateLabel,this);

        this.createEventListener('currentStatePropertyChanged',this.cStateChanged,this);

        this.setCurrentState("up");

    }



    this.updateLabel=function(){

        if(this.hasSkinPart('label')){

            this.getSkinPart('label').setText(this.getLabel());

        }

    }



    this.partAdded=function(partName,instance){

        if(partName=='label'){

            instance.setText(this.getLabel());

        }

    }



    this.getSkinState=function(){

        if(!this.getEnabled()){

            return "disabled";

        }else{

            return this.getCurrentState();

        }

    }



    this.cStateChanged=function(event){

         this.invalidateSkinState();

    }



}