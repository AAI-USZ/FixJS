function(seriesScene, seriesData1){
        seriesScene.vars.series = new pvc.visual.ValueLabelVar(
            seriesData1.value,
            seriesData1.label);
    }