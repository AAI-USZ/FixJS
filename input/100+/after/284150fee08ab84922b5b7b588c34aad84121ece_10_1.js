function(role){
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
            }