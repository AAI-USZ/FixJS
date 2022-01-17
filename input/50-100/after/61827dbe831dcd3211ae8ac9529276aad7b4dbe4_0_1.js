function(){
       this._super();

        //clear canvas element from parent element
        if(this._layerCanvas.parentNode){
            this._layerCanvas.parentNode.removeChild(this._layerCanvas);
        }
    }