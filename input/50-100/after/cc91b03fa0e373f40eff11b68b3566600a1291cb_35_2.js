function()
    {
        this.onStateChange = Obj.bindFixed(this.contentStateCheck, this);
        this.onHoverChange = Obj.bindFixed(this.contentStateCheck, this, STATE_HOVER);
        this.onActiveChange = Obj.bindFixed(this.contentStateCheck, this, STATE_ACTIVE);

        CSSStyleSheetPanel.prototype.initialize.apply(this, arguments);
    }