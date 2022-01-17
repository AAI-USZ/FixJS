function(){

        this.callSuper('init');

        this.createEventListener('textPropertyChanged',this._updateText,this);

        this.setWidth('auto');

        this.setHeight('auto');

        $(this.domElement).html(this.getText());

    }