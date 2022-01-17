function (item) {
        this.initWithTarget(null, null);
        this._subItems = [];
        this._subItems.push(item);
        this._selectedIndex = cc.UINT_MAX;
        this.setSelectedIndex(0);
        return true;
    }