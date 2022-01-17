function()
    {
        if(this._drawing)
        {
            this._callLater = true;
            return;
        }
        var sc,
            i,
            len,
            graphic = this.get("graphic");
        graphic.set("autoDraw", false);
        this._callLater = false;
        this._drawing = true;
        sc = this.get("seriesCollection");
        i = 0;
        len = sc.length;
        for(; i < len; ++i)
        {
            sc[i].draw();
            if((!sc[i].get("xcoords") || !sc[i].get("ycoords")) && !sc[i] instanceof Y.PieSeries)
            {
                this._callLater = true;
                break;
            }
        }
        this._drawing = false;
        if(this._callLater)
        {
            this._drawSeries();
        }
    }