function (newWindowSize) {
        if(this._openGLView){
            this._winSizeInPoints = this._openGLView.getSize();
            this._winSizeInPixels = cc.SizeMake(this._winSizeInPoints.width * this._contentScaleFactor,
                this._winSizeInPoints.height * this._contentScaleFactor);

            this.setProjection(this._projection);
        }
    }