function (texture) {
        //TODO
        if(this._texture != texture){
            this._texture = texture;
            this._updateBlendFunc();
        }
    }