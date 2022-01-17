function createCategSceneRecursive(catData, level){
            var children = catData.children()
                                  .where(function(child){ return child.key !== ""; })
                                  .array();
            if(children.length){
                // Group node
                if(level){
                    var categScene = new pvc.visual.Scene(rootScene, {group: catData});

                    var categAct = categScene.acts.category = {
                        value: catData.value,
                        label: catData.label,
                        group: catData,
                        level: level
                    };

                    var valueAct = categScene.acts.value = {};
                    var ruleInfo = ruleInfoByCategKey[catData.absKey];
                    var offset = ruleInfo.offset,
                        range = ruleInfo.range,
                        height = -range.min + range.max
                        ;

                    if(isFalling){
                        var lastChild = lastLeaf(catData);
                        var lastRuleInfo = ruleInfoByCategKey[lastChild.absKey];
                        categAct.leftValue  = ruleInfo.group.value;
                        categAct.rightValue = lastRuleInfo.group.value;
                        valueAct.bottomValue = offset - range.max;

                    } else {
                        var firstChild = firstLeaf(catData);
                        var firstRuleInfo = ruleInfoByCategKey[firstChild.absKey];
                        categAct.leftValue = firstRuleInfo.group.value;
                        categAct.rightValue = ruleInfo.group.value;
                        valueAct.bottomValue = offset - range.max;
                    }

                    valueAct.heightValue = height;
                }

                children.forEach(function(child){
                    createCategSceneRecursive(child, level + 1);
                });
            }
        }