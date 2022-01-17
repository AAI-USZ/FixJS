function createIntermediateScene(
                     seriesScene, 
                     fromScene, 
                     toScene, 
                     toChildIndex){
            
            /* Code for single, continuous and numeric dimensions */
            var interYValue = (toScene.vars.y.value + fromScene.vars.y.value) / 2;
            var interXValue = (toScene.vars.x.value + fromScene.vars.x.value) / 2;
            
            //----------------
            
            var interScene = new pvc.visual.Scene(seriesScene, {
                    /* insert immediately before toScene */
                    index: toChildIndex,
                    datum: toScene.datum
                });
            
            interScene.vars.x = new pvc.visual.ValueLabelVar(
                                    interXValue,
                                    chart._xDim.format(interXValue));
            
            interScene.vars.y = new pvc.visual.ValueLabelVar(
                                    interYValue,
                                    chart._yDim.format(interYValue));
            
            if(getColorRoleValue){
                interScene.vars.color = toScene.vars.color;
            }
            
            if(getDotSizeRoleValue){
                interScene.vars.dotSize = toScene.vars.dotSize;
            }
            
            interScene.isIntermediate = true;
            interScene.isSingle = false;
            
            applyScales(interScene);
            
            return interScene;
        }