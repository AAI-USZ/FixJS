function createCategSceneRecursive(catData, level){
            var children = catData.children()
                                  .where(function(child){ return child.key !== ""; })
                                  .array();
            if(children.length){
                // Group node
                if(level){
                    var categScene = new pvc.visual.Scene(rootScene, {group: catData});

                    var categVar = 
                        categScene.vars.category = 
                            new pvc.visual.ValueLabelVar(
                                    catData.value,
                                    catData.label);
                    
                    categVar.group = catData;
                    categVar.level = level;

                    var valueVar = categScene.vars.value = {}; // TODO: Not A Var
                    var ruleInfo = ruleInfoByCategKey[catData.absKey];
                    var offset = ruleInfo.offset,
                        range = ruleInfo.range,
                        height = -range.min + range.max
                        ;

                    if(isFalling){
                        var lastChild = lastLeaf(catData);
                        var lastRuleInfo = ruleInfoByCategKey[lastChild.absKey];
                        categVar.leftValue  = ruleInfo.group.value;
                        categVar.rightValue = lastRuleInfo.group.value;
                        valueVar.bottomValue = offset - range.max;

                    } else {
                        var firstChild = firstLeaf(catData);
                        var firstRuleInfo = ruleInfoByCategKey[firstChild.absKey];
                        categVar.leftValue = firstRuleInfo.group.value;
                        categVar.rightValue = ruleInfo.group.value;
                        valueVar.bottomValue = offset - range.max;
                    }

                    valueVar.heightValue = height;
                }

                children.forEach(function(child){
                    createCategSceneRecursive(child, level + 1);
                });
            }
        }