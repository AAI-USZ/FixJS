function()
    {
        var background,
            cb,
            bg,
            sc = this.get("seriesCollection"),
            series,
            i = 0,
            len = sc.length,
            hgl = this.get("horizontalGridlines"),
            vgl = this.get("verticalGridlines");
        if(this.get("showBackground"))
        {
            background = this.get("background");
            cb = this.get("contentBox");
            bg = this.get("styles").background;
            bg.stroke = bg.border;
            bg.stroke.opacity = bg.stroke.alpha;
            bg.fill.opacity = bg.fill.alpha;
            bg.width = this.get("width");
            bg.height = this.get("height");
            bg.type = bg.shape;
            background.set(bg);
        }
        for(; i < len; ++i)
        {
            series = sc[i];
            if(series instanceof Y.CartesianSeries)
            {
                series.render();
            }
        }
        if(hgl && hgl instanceof Y.Gridlines)
        {
            hgl.draw();
        }
        if(vgl && vgl instanceof Y.Gridlines)
        {
            vgl.draw();
        }
    }