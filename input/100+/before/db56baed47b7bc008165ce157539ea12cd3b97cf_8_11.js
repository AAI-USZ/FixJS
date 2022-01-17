function (openGLView) {
        cc.Assert(openGLView, "opengl view should not be null");

        if (this._openGLView != openGLView) {
            // because EAGLView is not kind of CCObject
            delete this._openGLView; // [openGLView_ release]
            this._openGLView = openGLView;

            // set size
            this._winSizeInPoints = this._openGLView.getSize();
            this._winSizeInPixels = cc.SizeMake(this._winSizeInPoints.width * this._contentScaleFactor, this._winSizeInPoints.height * this._contentScaleFactor);
            this.setGLDefaultValues();

            if (this._contentScaleFactor != 1) {
                this.updateContentScaleFactor();
            }

            var touchDispatcher = cc.TouchDispatcher.sharedDispatcher();
            this._openGLView.setTouchDelegate(touchDispatcher);
            touchDispatcher.setDispatchEvents(true);
        }
    }