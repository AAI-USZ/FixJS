function (sender) {
        this._disabledItem.setIsEnabled(!this._disabledItem.getIsEnabled());
        this._disabledItem.stopAllActions();
    }