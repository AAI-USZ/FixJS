function () {
        // calculate "global" dt
        this.calculateDeltaTime();

        //tick before glClear: issue #533
        if (!this._paused) {
            this._scheduler.update(this._deltaTime);
        }
        //this._fullRect = new cc.Rect(0, 0, cc.canvas.width, cc.canvas.height);
        //cc.renderContext.clearRect(this._fullRect.origin.x, this._fullRect.origin.y, this._fullRect.size.width, -this._fullRect.size.height);
        cc.renderContext.clearRect(0, 0, cc.canvas.width, -cc.canvas.height);

        /*
         var isSaveContext = false;
         //glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

         if (this._dirtyRegion) {
         //cc.renderContext.clearRect(0, 0, cc.canvas.width, -cc.canvas.height);

         var fullRect = new cc.Rect(0, 0, cc.canvas.width, cc.canvas.height);
         this._dirtyRegion = cc.Rect.CCRectIntersection(this._dirtyRegion, fullRect);

         if(cc.Rect.CCRectEqualToRect(cc.RectZero(), this._dirtyRegion)){
         this._dirtyRegion = null;
         }else{
         cc.renderContext.clearRect(0 | this._dirtyRegion.origin.x, -(0 | this._dirtyRegion.origin.y),
         0 | this._dirtyRegion.size.width, -(0 | this._dirtyRegion.size.height));

         if(!cc.Rect.CCRectEqualToRect(fullRect, this._dirtyRegion)){
         isSaveContext = true;
         cc.renderContext.save();
         cc.renderContext.beginPath();
         cc.renderContext.rect(0 | this._dirtyRegion.origin.x - 1, -(0 | this._dirtyRegion.origin.y - 1),
         0 | this._dirtyRegion.size.width + 2, -(0 | this._dirtyRegion.size.height + 2));
         cc.renderContext.clip();
         cc.renderContext.closePath();
         }
         }
         }
         */

        /* to avoid flickr, nextScene MUST be here: after tick and before draw.
         XXX: Which bug is this one. It seems that it can't be reproduced with v0.9 */
        if (this._nextScene) {
            this.setNextScene();
        }

        //kmGLPushMatrix();

        // draw the scene
        if (this._runningScene) {
            //if (this._dirtyRegion) {
            this._runningScene.visit();
            //}
        }

        /*
         if (this._dirtyRegion) {
         this._dirtyRegion = null;
         if(isSaveContext){
         cc.renderContext.restore();
         }
         }
         */

        // draw the notifications node
        if (this._notificationNode) {
            this._notificationNode.visit();
        }

        if (this._displayStats) {
            this._showStats();
        }

        if(this._watcherFun && this._watcherSender){
            this._watcherFun.call(this._watcherSender);
        }

        //TODO OpenGL
        //kmGLPopMatrix();

        this._totalFrames++;

        // swap buffers
        if (this._openGLView) {
            this._openGLView.swapBuffers();
        }

        if(this._displayStats){
            this._calculateMPF();
        }
    }