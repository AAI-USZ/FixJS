function (target) {
        this._grabber.afterRender(this._texture);

        this.set3DProjection();

        if (target.getCamera().getDirty()) {
            var offset = target.getAnchorPointInPixels();

            //
            // XXX: Camera should be applied in the AnchorPoint
            //
            //todo gl
            //ccglTranslate(offset.x, offset.y, 0);
            target.getCamera().locate();
            //ccglTranslate(-offset.x, -offset.y, 0);
        }
//todo gl
        //glBindTexture(GL_TEXTURE_2D, this._texture.getName());

        // restore projection for default FBO .fixed bug #543 #544
        //cc.Director.sharedDirector().setProjection(cc.Director.sharedDirector().getProjection());
        //cc.Director.sharedDirector().applyOrientation();
        this.blit();
    }