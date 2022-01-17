function(type){
                var color = this.delegate();
                if(color === undefined){
                    var colorValue = this.scene.acts.color.value;
                    
                    color = colorValue == null ?
                                options.nullColor :
                                colorScale(colorValue);
                    
                    if(type === 'stroke'){
                        color = color.darker();
                    }
                    
                    if(!myself.showLines){
                        color.opacity = 0.8;
                    }
                }
                
                return color;
            }