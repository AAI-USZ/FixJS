function hide(direction) {
            if (this.isBusy())
                return;

            var that = this, cb = function () {
                this.removeListener(Panel.ANIM_END, cb);
                that._setFree();
            };
            this.addListener(Panel.ANIM_END, cb);

            this._setBusy();
            this.animHide(direction);
            this.triggerEvent(Panel.ON_HIDE, [this]);
        }