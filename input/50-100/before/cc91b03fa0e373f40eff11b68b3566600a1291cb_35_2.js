function()
    {
        this.onMouseDown = Obj.bind(this.onMouseDown, this);
        this.onClick = Obj.bind(this.onClick, this);
        this.onStateChange = Obj.bindFixed(this.contentStateCheck, this);
        this.onHoverChange = Obj.bindFixed(this.contentStateCheck, this, STATE_HOVER);
        this.onActiveChange = Obj.bindFixed(this.contentStateCheck, this, STATE_ACTIVE);

        // We only need the basic panel initialize, not the intermeditate objects
        Firebug.Panel.initialize.apply(this, arguments);
    }