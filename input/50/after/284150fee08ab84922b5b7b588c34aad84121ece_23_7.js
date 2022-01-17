function(scene){
                     if(scene.vars.category.group._isFlattenGroup){
                         return false;
                     }

                     return isFalling || !!scene.nextSibling;
                 }