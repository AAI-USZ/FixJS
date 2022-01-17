function(scene){
            if(isFalling && !this.index){
                // First falling bar is the main total
                // Must be accounted up and update the total
                return 1;
            }

            if(scene.acts.category.group._isFlattenGroup){
                // Groups don't update the total
                // Groups, always go down, except the first falling...
                return -2;
            }
            
            return isFalling ? -1 : 1;
        }