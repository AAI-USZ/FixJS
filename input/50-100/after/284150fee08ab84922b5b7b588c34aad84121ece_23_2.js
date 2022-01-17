function createCategScene(ruleInfo){
            var categData1 = ruleInfo.group,
                categScene = new pvc.visual.Scene(rootScene, {group: categData1});

            var categVar = 
                categScene.vars.category = 
                    new pvc.visual.ValueLabelVar(
                                categData1.value,
                                categData1.label);
            
            categVar.group = categData1;
            
            var value = ruleInfo.offset;
            categScene.vars.value = new pvc.visual.ValueLabelVar(
                                value,
                                this.chart._valueDim.format(value));
        }