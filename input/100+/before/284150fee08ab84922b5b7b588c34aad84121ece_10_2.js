function createCategScene(categData){
            var categScene = new pvc.visual.Scene(rootScene, {group: categData}),
                acts = categScene.acts;
            
            var catAct = acts.category = {
                value:     categData.value,
                label:     categData.label,
                group:     categData,
                x:         baseScale(categData.value),
                width:     bandWidth,
                boxWidth:  boxWidth
            };

            catAct.boxLeft = bandWidth / 2 - boxWidth / 2;
            
            chart.measureVisualRoles().forEach(function(role){
                var dimName = measureRolesDimNames[role.name],
                    act;

                if(dimName){
                    var dim = categData.dimensions(dimName),
                        value = dim.sum(visibleKeyArgs);
                    act = {
                        value: value,
                        label: dim.format(value),
                        position: orthoScale(value)
                    };
                } else {
                    act = {
                        value: null,
                        label: "",
                        position: null
                    };
                }

                acts[role.name] = act;
            });

            var has05 = acts.percentil5.value  != null,
                has25 = acts.percentil25.value != null,
                has50 = acts.median.value != null,
                has75 = acts.percentil75.value != null,
                bottom,
                top;

            var show = has25 || has75;
            if(show){
                bottom = has25 ? acts.percentil25.position :
                         has50 ? acts.median.position :
                         acts.percentil75.position
                         ;

                top    = has75 ? acts.percentil75.position :
                         has50 ? acts.median.position :
                         acts.percentil25.position
                         ;

                show = (top !== bottom);
                if(show){
                    catAct.boxBottom = bottom;
                    catAct.boxHeight = top - bottom;
                }
            }
            
            catAct.showBox  = show;
            
            // vRules
            show = acts.percentil95.value != null;
            if(show){
                bottom = has75 ? acts.percentil75.position :
                         has50 ? acts.median.position :
                         has25 ? acts.percentil25.position :
                         has05 ? acts.percentil5.position  :
                         null
                         ;
                
                show = bottom != null;
                if(show){
                    catAct.vRuleAboveBottom = bottom;
                    catAct.vRuleAboveHeight = acts.percentil95.position - bottom;
                }
            }

            catAct.showVRuleAbove = show;

            // ----

            show = has05;
            if(show){
                top = has25 ? acts.percentil25.position :
                      has50 ? acts.median.position :
                      has75 ? acts.percentil75.position :
                      null
                      ;

                show = top != null;
                if(show){
                    bottom = acts.percentil5.position;
                    catAct.vRuleBelowHeight = top - bottom;
                    catAct.vRuleBelowBottom = bottom;
                }
            }
            
            catAct.showVRuleBelow = show;
            
            // has05 = acts.percentil5.value  != null,
        }