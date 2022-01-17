function(role){
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
            }