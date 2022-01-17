function(scene){
                    var categAct = scene.acts.category,
                        length = Math.abs(baseScale(categAct.rightValue) -
                                baseScale(categAct.leftValue))
                        ;

                    return length + barStepWidth;
                }