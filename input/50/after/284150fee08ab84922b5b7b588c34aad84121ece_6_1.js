function(scene){
                    var value = scale(scene.vars.tick.value);
                    if(this.index +  1 < count){
                        return value - halfStep;
                    }

                    // end line
                    return value + halfStep;
                }