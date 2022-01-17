function () {
        if (this._m_bPurgeDirecotorInNextLoop) {
            this.purgeDirector();
            this._m_bPurgeDirecotorInNextLoop = false;
        }
        else if (!this.m_bInvalid) {
            this.drawScene();

            // release the objects
            //cc.PoolManager::getInstance()->pop();
            cc.KeypadDispatcher.sharedDispatcher().clearKeyUp();
        }
    }