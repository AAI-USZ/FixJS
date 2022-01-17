function(){

        var myself = this,
            options = this.chart.options;
        
        this.colorValIdx = options.colorValIdx;
        this.sizeValIdx = options.sizeValIdx;
        this.selectNullValues = options.nullShape != null;
        
        // colors
        options.nullColor = pv.color(options.nullColor);
        if(options.minColor != null) options.minColor = pv.color(options.minColor);
        if(options.maxColor != null) options.maxColor = pv.color(options.maxColor);
        
        if(options.shape != null) {this.shape = options.shape;}
        
        var anchor = this.isOrientationVertical() ? "bottom" : "left";

        // reuse the existings scales
        var xScale = this.chart.xAxisPanel.scale;
        var yScale = this.chart.yAxisPanel.scale;
        
        var cols = (anchor === "bottom") ? xScale.domain() : yScale.domain();

        // NOTE: used in .getNormalColorScale()
        var origData = this.origData = this.chart.dataEngine.getVisibleTransposedValues();
        
        // create a mapping of the data that shows the columns (rows)
        var data = origData.map(function(d){
            return pv.dict(cols, function(){
                return d[this.index];
            });
        });

        // get an array of scaling functions (one per column)
        var fill = this.getColorScale(data, cols);

        /* The cell dimensions. */
        var w = (xScale.max - xScale.min) / xScale.domain().length;
        var h = (yScale.max - yScale.min) / yScale.domain().length;

        if (anchor !== "bottom") {
            var tmp = w;
            w = h;
            h = tmp;
        }
        
        this._cellWidth = w;
        this._cellHeight = h;
        
        this.pvHeatGrid = this.pvPanel.add(pv.Panel)
            .data(cols)
            [pvc.BasePanel.relativeAnchor[anchor]](function(){ //ex: datum.left(i=1 * w=15)
                return this.index * w;
                })
            [pvc.BasePanel.parallelLength[anchor]](w)
            .add(pv.Panel)
            .data(data)
            [anchor]
            (function(){
                return this.index * h;
            })
            [pvc.BasePanel.orthogonalLength[anchor]](h)
            .antialias(false)
            .strokeStyle(null)
            .lineWidth(0)
            .overflow('hidden'); //overflow important if showValues=true
        
        // tooltip text
        this.pvHeatGrid.text(function(d,f){
            return myself.getValue(d[f]);
        });
         
        // set coloring and shape / sizes if enabled
        if(options.useShapes){
            this.createHeatMap(data, w, h, options, fill);
        } else {
            // no shapes, apply color map to panel itself
            this.pvHeatGrid.fillStyle(function(dat, col){
                return (dat[col] != null) ? fill[col](dat[col]) : options.nullColor;
            });

            // Tooltip
            if(options.showTooltips){
                this.pvHeatGrid
                    .event("mouseover", pv.Behavior.tipsy(options.tipsySettings));
            }
        }

        // clickAction
        if (this._shouldHandleClick()){
            this.pvHeatGrid
                .cursor("pointer")
                .event("click", function(row, rowCol){
                    var d = row[rowCol],
                        ev = arguments[arguments.length - 1]; 
                    return myself._handleClick(this, d, ev);
                });
        }
        
        //showValues
        if(this.showValues){
            var getValue = function(row, rowAgain, rowCol){
                return row[rowCol];
            };

            this.pvHeatGridLabel = this.pvHeatGrid
                .anchor("center")
                .add(pv.Label)
                .bottom(0)
                .text(getValue);
        }
    }