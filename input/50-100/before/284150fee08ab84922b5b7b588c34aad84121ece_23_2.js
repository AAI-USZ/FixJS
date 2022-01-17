function createCategScene(ruleInfo){
            var categData1 = ruleInfo.group,
                categScene = new pvc.visual.Scene(rootScene, {group: categData1});

            categScene.acts.category = {
                value: categData1.value,
                label: categData1.label,
                group: categData1
            };

            var value = ruleInfo.offset;
            categScene.acts.value = {
                value: value,
                label: this.chart._valueDim.format(value)
            };
        }