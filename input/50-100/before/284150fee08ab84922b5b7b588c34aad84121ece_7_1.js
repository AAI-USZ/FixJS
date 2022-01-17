function(scene){
                var value = scene.acts.value.value;
                if(value == null){
                    return false;
                }

                var targetInstance = this.scene.target[this.index];
                // Where is the position of the max of the bar??
                var orthoMaxPos = targetInstance[orthoProp] +
                                  (value > 0 ? targetInstance[lengthProp] : 0);
                return isMin ?
                        (orthoMaxPos < rOrthoBound) :
                        (orthoMaxPos > rOrthoBound);
            }