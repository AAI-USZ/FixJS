function (){
        
        this.display = global.screen.get_display();
        
        this.signalConnectID = this.display.connect('window-created', Lang.bind(this, this._slideIn));

        global._slide_in_aminator = this;
        
        this._half = global.screen_width/2;
        
    }