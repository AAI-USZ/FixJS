function (touch, e) {
        if (this._state != cc.CCMENU_STATE_WAITING || !this._isVisible || !this._enabled) {
            return false;
        }

        for (var c = this._parent; c != null; c = c.getParent()) {
            if (!c.isVisible()) {
                return false;
            }
        }

        this._selectedItem = this._itemForTouch(touch);
        if (this._selectedItem) {
            this._state = cc.CCMENU_STATE_TRACKING_TOUCH;
            this._selectedItem.selected();
            return true;
        }
        return false;
    }