function(scene){
                    var value = scale(scene.acts.value.value);
                    if(this.index +  1 < count){
                        return value - halfStep;
                    }

                    // end line
                    return value + halfStep;
                }