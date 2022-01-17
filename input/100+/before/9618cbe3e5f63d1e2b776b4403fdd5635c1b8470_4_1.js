function(){



    this.init=function(){

        this.callSuper('init');

        this.setSkinClass("core.skins.PanelSkin");

        this.createEventListener('showControlBarPropertyChanged',this.invalidateSkinState,this);

        this.createEventListener('controlBarContentPropertyChanged',this._controlBarContentChanged,this);

    }



    this._controlBarContentChanged=function(){

        if(this.hasSkinPart('controlBar')){

            var cbContent=this.getControlBarContent();

            for(var i in cbContent){

                this.getSkinPart('controlBar').addElement(cbContent[i]);

            }

        }

        this.invalidateSkinState();

    }



    this.getSkinState=function(){

        if(this.getShowControlBar()=='yes'){

            return "normalWithControlBar";

        }else if(this.getShowControlBar()=='no'){

            return "normal";

        }else if(this.getShowControlBar()=='auto' && this.getControlBarContent().length==0){

            return "normal";

        }else{

            return "normalWithControlBar";

        }

    }



    this.partAdded=function(name,instance){

        this.callSuper('partAdded',name,instance);

        if(name=='controlBar'){

            var cbContent=this.getControlBarContent();

            for(var i in cbContent){

                instance.addElement(cbContent[i]);

            }

        }

    }





}