function(e)
    {
        var dataProvider = e.newVal,
            axes,
            i,
            axis;
        this._seriesIndex = -1;
        this._itemIndex = -1;
        this.set("axes", this.get("axes"));
        axes = this.get("axes");
        this.set("seriesCollection", this.get("seriesCollection"));
        if(axes)
        {
            for(i in axes)
            {
                if(axes.hasOwnProperty(i))
                {
                    axis = axes[i];
                    if(axis instanceof Y.Axis)
                    {
                        if(axis.get("position") != "none")
                        {
                            this._addToAxesRenderQueue(axis);
                        }
                        axis.set("dataProvider", dataProvider);
                    }
                }
            }
        }
    }