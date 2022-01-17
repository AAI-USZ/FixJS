function(keyArgs){
        this.base(keyArgs);

        // Cached
        var dotSizeGrouping = this._dotSizeRole.grouping;
        if(dotSizeGrouping){
            this._dotSizeDim = this.data.dimensions(dotSizeGrouping.firstDimension.name);
        }

        /* Change the legend source role */
        if(!this.parent){
            var colorGrouping = this._colorRole.grouping;
            if(colorGrouping) {
                if(colorGrouping.isDiscrete()){
                    // role is bound and discrete => change legend source
                    this.legendSource = 'color';
                } else {
                    /* The "color legend" has no use
                     * but to, possibly, show/hide "series",
                     * if any
                     */
                    this.options.legend = false;
                }
            }
        }
    }