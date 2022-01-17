function () {
        if (!this._paused) {
            return;
        }
        //this.addRegionToDirtyRegion(new cc.Rect(0, 0, cc.canvas.width, cc.canvas.height));

        this.setAnimationInterval(this._oldAnimationInterval);
        this._lastUpdate = cc.Time.gettimeofdayCocos2d();
        if (!this._lastUpdate) {
            cc.log("cocos2d: Director: Error in gettimeofday");
        }

        this._paused = false;
        this._deltaTime = 0;
    }