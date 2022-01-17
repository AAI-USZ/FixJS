function createIntermediateScene(
                     seriesScene, 
                     fromScene, 
                     toScene, 
                     toChildIndex){
            
            /* Code for single, continuous and numeric dimensions */
            var interYValue = (toScene.acts.y.value + fromScene.acts.y.value) / 2;
            var interXValue = (toScene.acts.x.value + fromScene.acts.x.value) / 2;
            
            //----------------
            
            var interScene = new pvc.visual.Scene(seriesScene, {
                    /* insert immediately before toScene */
                    index: toChildIndex,
                    datum: toScene.datum
                });
            
            interScene.acts.x = {
                value: interXValue,
                label: chart._xDim.format(interXValue)
            };
            
            interScene.acts.y = {
                value: interYValue,
                label: chart._yDim.format(interYValue)
            };
            
            if(getColorRoleValue){
                interScene.acts.color = toScene.acts.color;
            }
            
            if(getDotSizeRoleValue){
                interScene.acts.dotSize = toScene.acts.dotSize;
            }
            
            interScene.isIntermediate = true;
            interScene.isSingle = false;
            
            applyScales(interScene);
            
            return interScene;
        }