function(type){
                var color = this.base(type);
                if(type === 'fill'){
                    if(this.scene.acts.category.group._isFlattenGroup){
                        return pv.color(color).alpha(0.75);
                    }
                }
                
                return color;
            }