function (item) {
        this.initWithTarget(null, null);
        this._subItems = [];
        this._subItems.push(item);
        this._selectedIndex = 0xffffffff;
        this.setSelectedIndex(0);
        return true;
    }