function () {
        if (this._purgeDirecotorInNextLoop) {
            this.purgeDirector();
            this._purgeDirecotorInNextLoop = false;
        }
        else if (!this.invalid) {
            this.drawScene();
        }
    }