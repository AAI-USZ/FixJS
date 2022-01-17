function(){
        
        this.base();

        var strokeStyle = this._getExtension("barWaterfallLine", "strokeStyle");
        if(strokeStyle && !def.isFun(strokeStyle)){
            this._waterColor = pv.color(strokeStyle);
        }

        this._addLegendGroup({
            id:        "waterfallTotalLine",
            type:      "discreteColorAndShape",
            items:     [{
                value: null,
                label: this.options.accumulatedLineLabel,
                color: this._waterColor,
                shape: 'bar',
                isOn:  def.constant(true),
                click: null
            }]
        });
    }