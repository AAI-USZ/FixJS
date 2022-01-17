function (e, keydown) {
        this._m_bLocked = true;
        e.stopPropagation();
        e.preventDefault();
        //update keymap
        if (keydown && e)//if keydown and our keymap doesnt have it
        {
            //execute all deletegate that registered a keyboard event
            for (var i = 0; i < this._m_pDelegates.length; i++) {
                this._m_pDelegates[i].getDelegate().keyDown(e.keyCode);
            }
        }
        else if (!keydown && e)//if keyup and our keymap have that key in it
        {
            for (var i = 0; i < this._m_pDelegates.length; i++) {
                this._m_pDelegates[i].getDelegate().keyUp(e.keyCode);
            }
        }
        this._m_bLocked = false;
        if (this._m_bToRemove) {
            this._m_bToRemove = false;
            for (var i = 0; i < this._m_pHandlersToRemove.length; ++i) {
                this.forceRemoveDelegate(this._m_pHandlersToRemove[i]);
            }
            delete this._m_pHandlersToRemove;
            this._m_pHandlersToRemove = [];
        }

        if (this._m_bToAdd) {
            this._m_bToAdd = false;
            for (var i = 0; i < this._m_pHandlersToAdd.length; ++i) {
                this.forceAddDelegate(this._m_pHandlersToAdd[i]);
            }
            this._m_pHandlersToAdd = [];
        }
        return true;
    }