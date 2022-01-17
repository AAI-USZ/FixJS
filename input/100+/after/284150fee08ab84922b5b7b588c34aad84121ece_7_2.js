function(categScene, categData1, seriesData1){
        var categVar = categScene.vars.category = new pvc.visual.ValueLabelVar(
            categData1.value, categData1.label);
        
        categVar.group = categData1;
        
        var chart = this.chart,
            valueDim = categScene.group ?
                            categScene
                                .group
                                .dimensions(chart._valueDim.name) :
                            null;

        var value = valueDim ? valueDim.sum({visible: true, zeroIfNone: false}) : null;

        var valueVar = 
            categScene.vars.value = new pvc.visual.ValueLabelVar(
                                    value, 
                                    chart._valueDim.format(value));
        
        // TODO: Percent formatting?
        if(chart.options.showValuePercentage) {
            if(value == null){
                valueVar.percent = new pvc.visual.ValueLabelVar(null, valueVar.label);
            } else {
                var valuePct = valueDim.percentOverParent({visible: true});
                
                valueVar.percent = new pvc.visual.ValueLabelVar(
                                        valuePct,
                                        chart.options.percentValueFormat.call(null, valuePct));
            }
        }

        categScene.isNull = !categScene.group; // A virtual scene?
    }