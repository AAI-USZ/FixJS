function()
    {
        var axes;
        if(this.get("dataProvider"))
        {
            axes = this._parseAxes();
        }
        return axes;
    }