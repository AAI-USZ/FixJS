function() {

        this.base();

        if(pvc.debug >= 3){
            pvc.log("Prerendering in pieChart");
        }
        
        this.pieChartPanel = new pvc.PieChartPanel(this, this.basePanel, {
            innerGap: this.options.innerGap,
            explodedSliceRadius: this.options.explodedSliceRadius,
            explodedSliceIndex: this.options.explodedSliceIndex,
            showValues: this.options.showValues,
            showTooltips: this.options.showTooltips
        });
    }