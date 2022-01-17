function (results){
        [this._title,this._album,this._performer,this._Loveit] = results[0];
        
        if (this._player.loveToggled){ // workaround for Love toggled but no signal come out
            this._Loveit = this._player.loveStatus; 
            this._player.loveToggled = false;
        }
        this._updateLabel();
    }