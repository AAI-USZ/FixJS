function()
    {
        this.onMouseDown = Obj.bind(this.onMouseDown, this);
        this.onClick = Obj.bind(this.onClick, this);

        Firebug.Panel.initialize.apply(this, arguments);
    }