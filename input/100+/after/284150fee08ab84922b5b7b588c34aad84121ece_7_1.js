function(){
        this.base();
         
        var chart = this.chart,
            options = chart.options,
            isStacked = !!this.stacked,
            isVertical = this.isOrientationVertical();

        var data = this._getVisibleData(), // shared "categ then series" grouped data
            seriesData = chart._serRole.flatten(data),
            rootScene = this._buildScene(data, seriesData)
            ;

        var orthoScale = chart.axes.ortho.scale,
            orthoZero  = orthoScale(0),
            sceneOrthoScale = chart.axes.ortho.sceneScale({sceneVarName: 'value', nullToZero: false}),
            
            bandWidth = chart.axes.base.scale.range().band,
            barStepWidth = chart.axes.base.scale.range().step,
            barWidth,

            reverseSeries = isVertical === isStacked // (V && S) || (!V && !S)
            ;

        if(isStacked){
            barWidth = bandWidth;
        } else {
            var S = seriesData.childCount();
            barWidth = S > 0 ? (bandWidth * this.barSizeRatio / S) : 0;
        }
        
        if (barWidth > this.maxBarSize) {
            barWidth = this.maxBarSize;
        }

        this.barWidth  = barWidth;
        this.barStepWidth = barStepWidth;
        
        this.pvBarPanel = this.pvPanel.add(pv.Layout.Band)
            .layers(rootScene.childNodes) // series -> categories
            .values(function(seriesScene){ return seriesScene.childNodes; })
            .orient(isVertical ? 'bottom-left' : 'left-bottom')
            .layout(isStacked  ? 'stacked' : 'grouped')
            .verticalMode(this._barVerticalMode())
            .yZero(orthoZero)
            .band // categories
                .x(chart.axes.base.sceneScale({sceneVarName: 'category'}))
                .w(bandWidth)
                .differentialControl(this._barDifferentialControl())
            .item
                // Stacked Vertical bar charts show series from
                // top to bottom (according to the legend)
                .order(reverseSeries ? "reverse" : null)
                .h(function(scene){
                    /* May be negative */
                    var h = sceneOrthoScale(scene);
                    return h != null ? chart.animate(0, h - orthoZero) : null;
                })
                .w(barWidth)
                .horizontalRatio(this.barSizeRatio)
                .verticalMargin(options.barStackedMargin || 0)
            .end
            ;

        this.pvBar = new pvc.visual.Bar(this, this.pvBarPanel.item, {
                extensionId: 'bar',
                freePosition: true
            })
            .lockDimensions()
            .pvMark
            ;

        this._addOverflowMarkers();
        
        if(this.showValues){
            this.pvBarLabel = this.pvBar.anchor(this.valuesAnchor || 'center')
                .add(pv.Label)
                .localProperty('_valueVar')
                ._valueVar(function(scene){
                    return options.showValuePercentage ?
                            scene.vars.value.percent :
                            scene.vars.value;
                })
                .visible(function() { //no space for text otherwise
                    var length = this.scene.target[this.index][isVertical ? 'height' : 'width'];
                    // Too small a bar to show any value?
                    return length >= 4;
                })
                .text(function(){
                    return this._valueVar().label;
                });
        }
    }