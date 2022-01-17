function(categScene, categData1, seriesData1){
        categScene.acts.category = {
            value: categData1.value,
            label: categData1.label,
            group: categData1
        };

        var chart = this.chart,
            valueDim = categScene.group ?
                            categScene
                                .group
                                .dimensions(chart._valueDim.name) :
                            null;

        var value = valueDim ? valueDim.sum({visible: true, zeroIfNone: false}) : null;

        var valueAct = categScene.acts.value = {
            value:    value,
            label:    chart._valueDim.format(value)
        };

        // TODO: Percent formatting?
        if(chart.options.showValuePercentage) {
            if(value == null){
                valueAct.percent = {
                    value: null,
                    label: valueAct.label
                };
            } else {
                var valuePct = valueDim.percentOverParent({visible: true});
                valueAct.percent = {
                    value: valuePct,
                    label: chart.options.valueFormat.call(null, Math.round(valuePct * 100))
                };
            }
        }

        categScene.isNull = !categScene.group; // A virtual scene?
    }