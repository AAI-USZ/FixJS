function(contentOptions) {

        this.base();

        if(pvc.debug >= 3){
            pvc.log("Prerendering in pieChart");
        }
        
        var options = this.options;
        var pieOptions = options.pie;
        
        this.pieChartPanel = new pvc.PieChartPanel(this, this.basePanel, def.create(contentOptions, {
            innerGap: options.innerGap,
            explodedOffsetRadius: options.explodedSliceRadius,
            explodedSliceIndex: options.explodedSliceIndex,
            activeOffsetRadius:  options.activeSliceRadius,
            showValues: options.showValues,
            valuesMask: options.valuesMask,
            labelStyle: options.valuesLabelStyle,
            linkedLabel: options.linkedLabel,
            labelFont:  options.valuesLabelFont,
            scenes: pieOptions && pieOptions.scenes
        }));
    }