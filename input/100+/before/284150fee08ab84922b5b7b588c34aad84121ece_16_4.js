function completeMainScene( 
                      fromScene, 
                      toScene, 
                      belowScene){
            
            var toAccValue = toScene.acts[this.valueRoleName].accValue;
            
            if(belowScene) {
                if(toScene.isNull && !isBaseDiscrete) {
                    toAccValue = orthoNullValue;
                } else {
                    toAccValue += belowScene.acts[this.valueRoleName].accValue;
                }
                
                toScene.acts[this.valueRoleName].accValue = toAccValue;
            }
            
            toScene.basePosition  = sceneBaseScale(toScene);
            toScene.orthoPosition = orthoZero;
            toScene.orthoLength   = orthoScale(toAccValue) - orthoZero;
            
            var isNullFrom = (!fromScene || fromScene.isNull),
                isAlone    = isNullFrom && !toScene.isNull;
            if(isAlone) {
                // Confirm, looking ahead
                var nextScene = toScene.nextSibling;
                isAlone  = !nextScene || nextScene.isNull;
            }
            
            toScene.isAlone  = isAlone;
            toScene.isSingle = false;
        }