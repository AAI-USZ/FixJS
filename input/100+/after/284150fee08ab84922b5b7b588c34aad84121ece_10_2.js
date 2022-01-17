function createCategScene(categData){
            var categScene = new pvc.visual.Scene(rootScene, {group: categData}),
                vars = categScene.vars;
            
            var catVar = vars.category = new pvc.visual.ValueLabelVar(
                                    categData.value,
                                    categData.label);
            def.set(catVar,
                'group',    categData,
                'x',        baseScale(categData.value),
                'width',    bandWidth,
                'boxWidth', boxWidth,
                'boxLeft',  bandWidth / 2 - boxWidth / 2);
            
            chart.measureVisualRoles().forEach(function(role){
                var dimName = measureRolesDimNames[role.name],
                    svar;

                if(dimName){
                    var dim = categData.dimensions(dimName),
                        value = dim.sum(visibleKeyArgs);
                    
                    svar = new pvc.visual.ValueLabelVar(value, dim.format(value));
                    svar.position = orthoScale(value);
                } else {
                    svar = new pvc.visual.ValueLabelVar(null, "");
                    svar.position = null;
                }

                vars[role.name] = svar;
            });

            var has05 = vars.percentil5.value  != null,
                has25 = vars.percentil25.value != null,
                has50 = vars.median.value != null,
                has75 = vars.percentil75.value != null,
                bottom,
                top;

            var show = has25 || has75;
            if(show){
                bottom = has25 ? vars.percentil25.position :
                         has50 ? vars.median.position :
                         vars.percentil75.position
                         ;

                top    = has75 ? vars.percentil75.position :
                         has50 ? vars.median.position :
                         vars.percentil25.position
                         ;

                show = (top !== bottom);
                if(show){
                    catVar.boxBottom = bottom;
                    catVar.boxHeight = top - bottom;
                }
            }
            
            catVar.showBox  = show;
            
            // vRules
            show = vars.percentil95.value != null;
            if(show){
                bottom = has75 ? vars.percentil75.position :
                         has50 ? vars.median.position :
                         has25 ? vars.percentil25.position :
                         has05 ? vars.percentil5.position  :
                         null
                         ;
                
                show = bottom != null;
                if(show){
                    catVar.vRuleAboveBottom = bottom;
                    catVar.vRuleAboveHeight = vars.percentil95.position - bottom;
                }
            }

            catVar.showVRuleAbove = show;

            // ----

            show = has05;
            if(show){
                top = has25 ? vars.percentil25.position :
                      has50 ? vars.median.position :
                      has75 ? vars.percentil75.position :
                      null
                      ;

                show = top != null;
                if(show){
                    bottom = vars.percentil5.position;
                    catVar.vRuleBelowHeight = top - bottom;
                    catVar.vRuleBelowBottom = bottom;
                }
            }
            
            catVar.showVRuleBelow = show;
            
            // has05 = vars.percentil5.value  != null,
        }