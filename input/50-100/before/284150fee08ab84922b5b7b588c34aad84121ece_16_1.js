function createSeriesScene(seriesData1){
            /* Create series scene */
            var seriesScene = new pvc.visual.Scene(rootScene, {group: seriesData1 || data});

            seriesScene.acts.series = {
                value: seriesData1 ? seriesData1.value : null,
                label: seriesData1 ? seriesData1.label : ""
            };
        }