function (dt) {
        this._accum += dt;
        cc.log("Time: " + this._accum);

        if (this._accum > 3) {
            this.unschedule(this.autoremove);
            cc.log("scheduler removed");
        }
    }