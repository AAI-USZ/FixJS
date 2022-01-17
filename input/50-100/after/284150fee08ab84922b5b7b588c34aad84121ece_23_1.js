function(type){
                var color = this.base(type);
                if(type === 'fill'){
                    if(this.scene.vars.category.group._isFlattenGroup){
                        return pv.color(color).alpha(0.75);
                    }
                }
                
                return color;
            }