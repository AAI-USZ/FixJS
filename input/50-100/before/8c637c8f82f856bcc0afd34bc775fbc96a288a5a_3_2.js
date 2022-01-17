function(){

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