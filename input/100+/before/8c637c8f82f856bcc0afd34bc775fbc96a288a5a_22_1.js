function(){

        this.callSuper('init');

        this.setSkinClass("core.skins.TitlePanelSkin");

        this.createEventListener('titleLabelPropertyChanged',this.updateLabel,this);

    }