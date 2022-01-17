function (child, zOrder, tag) {
        cc.Assert((child instanceof cc.MenuItem), "Menu only supports MenuItem objects as children");
        this._super(child, zOrder, tag);
    }