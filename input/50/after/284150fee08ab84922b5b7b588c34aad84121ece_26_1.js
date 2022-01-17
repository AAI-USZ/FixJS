function(type){
        var colorVar = this.scene.vars[this.chart.legendSource];
        /* Legend color is a function of the chart's legendSource */
        return this.legendColorScale()(colorVar && colorVar.value);
    }