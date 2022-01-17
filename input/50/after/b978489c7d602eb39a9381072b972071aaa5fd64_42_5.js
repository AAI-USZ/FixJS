function (sender) {
        this._disabledItem.setEnabled(!this._disabledItem.isEnabled());
        this._disabledItem.stopAllActions();
    }