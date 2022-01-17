function(scene){
                     if(scene.acts.category.group._isFlattenGroup){
                         return false;
                     }

                     return isFalling || !!scene.nextSibling;
                 }