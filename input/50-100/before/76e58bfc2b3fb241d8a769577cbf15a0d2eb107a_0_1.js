function(){
       this._super();

        var context = this._layerContext;
        context.save();
        context.clearRect(0, 0, this._layerCanvas.width, -this._layerCanvas.height);
        context.restore();
    }