function(){

        this.callSuper('init');

        this.createEventListener('textPropertyChanged',this._updateText,this);

        this.createEventListener('fontColorPropertyChanged',this.invalidateFont,this);

        this.createEventListener('fontSizePropertyChanged',this.invalidateFont,this);

        this.createEventListener('fontFamilyPropertyChanged',this.invalidateFont,this);

        this.setWidth('auto');

        this.setHeight('auto');

        this.domElement.innerHTML=this.getText();

    }