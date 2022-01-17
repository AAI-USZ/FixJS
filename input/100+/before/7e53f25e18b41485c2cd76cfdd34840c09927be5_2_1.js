function(e)
    {
        var dataProvider = e.newVal,
            axes = this.get("axes"),
            i,
            axis;
        this._seriesIndex = -1;
        this._itemIndex = -1;
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