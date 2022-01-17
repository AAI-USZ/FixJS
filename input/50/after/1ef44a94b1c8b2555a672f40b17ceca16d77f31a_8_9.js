function () {
        if (this._purgeDirecotorInNextLoop) {
            this._purgeDirecotorInNextLoop = false;
            this.purgeDirector();
        }
        else if (!this.invalid) {
            this.drawScene();
        }
    }