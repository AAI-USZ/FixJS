function(){

        this.callSuper('init');

        this.setSkinClass("core.skins.PanelSkin");

        this.createEventListener('showControlBarPropertyChanged',this.invalidateSkinState,this);

        this.createEventListener('controlBarContentPropertyChanged',this._controlBarContentChanged,this);

    }