function(){
        if(this._listener){
            this.clearEventListener();
        }
        if(this.parentNode){
            this.removeChild(this);
        }
    }