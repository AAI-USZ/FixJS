function(){



    this.createAttributes=function(){

        this.callSuper('createAttributes');

        this.declareSkinPart('label',false,'core.Label');

    }



    this.init=function(){

        this.callSuper('init');

        this.setSkinClass("core.skins.TitlePanelSkin");

        this.createEventListener('titleLabelPropertyChanged',this.updateLabel,this);

    }





    this.partAdded=function(name,instance){

        this.callSuper('partAdded',name,instance);

        if(name=='label'){

            instance.setText(this.getTitleLabel());

        }

    }



    this.updateLabel=function(){

        if(this.hasSkinPart('label')){

            this.getSkinPart('label').setText(this.getTitleLabel());

        }

    }





}