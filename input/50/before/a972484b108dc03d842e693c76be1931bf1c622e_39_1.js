function (dt) {
        this._accum += dt;
        cc.Log("Time: " + this._accum);

        if (this._accum > 3) {
            this.unschedule(this.autoremove);
            cc.Log("scheduler removed");
        }
    }