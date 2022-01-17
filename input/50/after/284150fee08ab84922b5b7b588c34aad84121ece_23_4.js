function(scene){
                    var categVar = scene.vars.category,
                        length = Math.abs(baseScale(categVar.rightValue) -
                                baseScale(categVar.leftValue))
                        ;

                    return length + barStepWidth;
                }