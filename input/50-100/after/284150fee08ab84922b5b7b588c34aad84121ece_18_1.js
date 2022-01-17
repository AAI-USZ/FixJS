function(type){
                var color = this.delegate();
                if(color === undefined){
                    var colorValue = this.scene.vars.color.value;
                    color = colorValue == null ?
                                options.nullColor :
                                colorScale(colorValue);
                }
                
                return color;
            }