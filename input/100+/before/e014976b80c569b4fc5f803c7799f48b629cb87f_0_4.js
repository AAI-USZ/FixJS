function(){
         this.base();

        var chart = this.chart,
            options = chart.options;

        var colorDimName = this.colorDimName = chart._colorDim   && chart._colorDim.name,
            sizeDimName  = this.sizeDimName  = chart._dotSizeDim && chart._dotSizeDim.name;
        
        // colors
        options.nullColor = pv.color(options.nullColor);
        
        if(options.minColor != null) { options.minColor = pv.color(options.minColor); }
        if(options.maxColor != null) { options.maxColor = pv.color(options.maxColor); }
        
        if(options.shape != null) {
            this.shape = options.shape;
        }
        
        var anchor = this.isOrientationVertical() ? "bottom" : "left";

        /* Use existing scales */
        var xScale = chart.axes.x.scale,
            yScale = chart.axes.y.scale;

        /* Determine cell dimensions. */
        var w = (xScale.max - xScale.min) / xScale.domain().length;
        var h = (yScale.max - yScale.min) / yScale.domain().length;

        if (anchor !== "bottom") {
            var tmp = w;
            w = h;
            h = tmp;
        }
        
        this._cellWidth  = w;
        this._cellHeight = h;
        
        /* Column and Row datas  */
        var keyArgs = {visible: true},
            // Two multi-dimension single-level data groupings
            colRootData = chart._catRole.flatten(chart.data, keyArgs),
            rowRootData = chart._serRole.flatten(chart.data, keyArgs),

            // <=> One multi-dimensional, two-levels data grouping
            data = this._getVisibleData();
        
        /* Color scale */
        var fillColorScaleByColKey;
        
        if(colorDimName){
            fillColorScaleByColKey =  pvc.color.scales(def.create(false, this.chart.options, {
                /* Override/create these options, inherit the rest */
                type: options.colorScaleType, 
                data: colRootData,
                colorDimension: colorDimName
            }));
        }
        
        function getFillColor(detectSelection){
            var color;
            
            var colorValue = this.colorValue();
            if(colorValue != null) {
                color = fillColorScaleByColKey[this.group().parent.absKey](colorValue);
            } else {
                color = options.nullColor;
            }
            
            if(detectSelection && 
               data.owner.selectedCount() > 0 && 
               !this.datum().isSelected){
                 color = pvc.toGrayScale(color, 0.6);
            }
            
            return color;
        }
        
        /* DATUM */
        function getDatum(rowData1, colData1){
            var colData = this.parent.group();
            if(colData) {
                var rowData = colData._childrenByKey[rowData1.absKey];
                if(rowData) {
                    var datum = rowData._datums[0];
                    if(datum) {
                        return datum;
                    }
                }
            }
            
            // Create a null datum with col and row coordinate atoms
            var atoms = def.array.append(
                            def.own(rowData1.atoms),
                            def.own(colData1.atoms));
            
            return new pvc.data.Datum(data, atoms, true);
        }
        
        /* PV Panels */
        var pvColPanel = this.pvPanel.add(pv.Panel)
            .data(colRootData._children)
            .localProperty('group', Object)
            .group(function(colData1){
                return data._childrenByKey[colData1.absKey]; // must exist
            })
            [pvc.BasePanel.relativeAnchor[anchor]](function(){ //ex: datum.left(i=1 * w=15)
                return this.index * w;
             })
            [pvc.BasePanel.parallelLength[anchor]](w)
            ;
        
        var pvHeatGrid = this.pvHeatGrid = pvColPanel.add(pv.Panel)
            .data(rowRootData._children)
            .localProperty('group', Object)
            .datum(getDatum)
            .group(function(rowData1){
                return this.parent.group()._childrenByKey[rowData1.absKey];
            })
            .localProperty('colorValue', Number)
            .colorValue(function(){
                return colorDimName && this.datum().atoms[colorDimName].value;
            })
            .localProperty('sizeValue',  Number)
            .sizeValue(function(){
                return sizeDimName && this.datum().atoms[sizeDimName].value;
            })
            ;
            
        pvHeatGrid
            [anchor](function(){ return this.index * h; })
            [pvc.BasePanel.orthogonalLength[anchor]](h)
            .antialias(false)
            .strokeStyle(null)
            .lineWidth(0)
            ;
            // THIS caused HUGE memory consumption and speed reduction (at least in use Shapes mode)
            //.overflow('hidden'); //overflow important if showValues=true
        
         
        if(options.useShapes){
            this.shapes = this.createHeatMap(w, h, getFillColor);
        } else {
            this.shapes = pvHeatGrid;
        }

        this.shapes
            //.text(getLabel) // Ended up showing when the tooltip should be empty
            .fillStyle(function(){
                return getFillColor.call(pvHeatGrid, true);
            })
            ;
        
        var valueDimName = colorDimName || sizeDimName;
        
        if(this.showValues && valueDimName){
            
            this.pvHeatGridLabel = pvHeatGrid.anchor("center").add(pv.Label)
                .bottom(0)
                .text(function(){
                    return this.datum().atoms[valueDimName].label;
                })
                ;
        }
        
        if(this._shouldHandleClick()){ // TODO: should have valueDimName -> value argument
            this._addPropClick(this.shapes);
        }

        if(options.doubleClickAction){ // TODO: should have valueDimName -> value argument
            this._addPropDoubleClick(this.shapes);
        }
        
        if(options.showTooltips){
            this._addPropTooltip(this.shapes, {tipsyEvent: 'mouseover'});
        }
    }