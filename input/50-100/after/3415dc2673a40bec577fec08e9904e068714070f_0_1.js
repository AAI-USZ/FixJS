function () {
        if (this._m_bPurgeDirecotorInNextLoop) {
            this.purgeDirector();
            this._m_bPurgeDirecotorInNextLoop = false;
        }
        else if (!this.m_bInvalid) {
            this.drawScene();
        }
    }