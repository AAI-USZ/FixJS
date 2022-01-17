function()
    {
        this.onMouseDown = Obj.bind(this.onMouseDown, this);
        this.onMouseUp = Obj.bind(this.onMouseUp, this);
        this.onClick = Obj.bind(this.onClick, this);

        Firebug.Panel.initialize.apply(this, arguments);
    }