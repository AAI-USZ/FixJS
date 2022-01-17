function(type){
        var colorAct = this.scene.acts[this.chart.legendSource];
        /* Legend color is a function of the chart's legendSource */
        return this.legendColorScale()(colorAct && colorAct.value);
    }