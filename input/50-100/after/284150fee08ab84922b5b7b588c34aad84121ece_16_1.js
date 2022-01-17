function createSeriesScene(seriesData1){
            /* Create series scene */
            var seriesScene = new pvc.visual.Scene(rootScene, {group: seriesData1 || data});

            seriesScene.vars.series = new pvc.visual.ValueLabelVar(
                        seriesData1 ? seriesData1.value : null,
                        seriesData1 ? seriesData1.label : "");
        }