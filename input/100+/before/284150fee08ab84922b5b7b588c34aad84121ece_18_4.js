function(data, hasColorRole){
        var rootScene = new pvc.visual.Scene(null, {panel: this, group: data});
        
        var chart = this.chart,
            sceneBaseScale  = chart.axes.base.sceneScale(),
            sceneOrthoScale = chart.axes.ortho.sceneScale(),
            getColorRoleValue,
            getDotSizeRoleValue;
            
        if(hasColorRole){
             var colorGrouping = chart._colorRole.grouping;//.singleLevelGrouping();
             if(colorGrouping.isSingleDimension){ // TODO
                 var colorDimName = chart._colorRole.firstDimensionName();
                 
                 getColorRoleValue = function(scene){
                     return scene.atoms[colorDimName].value;
                 };
             } else {
                 getColorRoleValue = function(scene) {
                     return colorGrouping.view(scene.datum).value;
                 };
             }
        }
        
        if(chart._dotSizeDim){
            var dotSizeDimName = chart._dotSizeDim.name;
            
            getDotSizeRoleValue = function(scene){
                return scene.atoms[dotSizeDimName].value;
            };
        }
         
        // --------------
        
        /** 
         * Create starting scene tree 
         */
        data.children()
            .each(createSeriesScene, this);
        
        /** 
         * Update the scene tree to include intermediate leaf-scenes,
         * to add in the creation of lines and areas. 
         */
        rootScene
            .children()
            .each(completeSeriesScenes, this);
        
        return rootScene;
        
        function applyScales(scene){
            scene.basePosition  = sceneBaseScale(scene);
            scene.orthoPosition = sceneOrthoScale(scene);
        }
        
        function createSeriesScene(seriesGroup){
            /* Create series scene */
            var seriesScene = new pvc.visual.Scene(rootScene, {group: seriesGroup});
            
            seriesScene.acts.series = {
                value: seriesGroup.value,
                label: seriesGroup.label
            };
            
            seriesGroup.datums().each(function(datum){
                /* Create leaf scene */
                var scene = new pvc.visual.Scene(seriesScene, {datum: datum});
                
                var atom = datum.atoms[chart._xDim.name];
                scene.acts.x = {
                    value: atom.value,
                    label: atom.label
                };
                
                atom = datum.atoms[chart._yDim.name];
                scene.acts.y = {
                    value: atom.value,
                    label: atom.label
                };
                
                if(getColorRoleValue){
                    scene.acts.color = {
                        value: getColorRoleValue(scene),
                        label: null
                    };
                }
                
                if(getDotSizeRoleValue){
                    var dotSizeValue = getDotSizeRoleValue(scene);
                    scene.acts.dotSize = {
                        value: dotSizeValue,
                        label: chart._dotSizeDim.format(dotSizeValue)
                    };
                }
                
                scene.isIntermediate = false;
                
                applyScales(scene);
            });
        }
        
        function completeSeriesScenes(seriesScene) {
            var seriesScenes = seriesScene.childNodes, 
                fromScene;
            
            /* As intermediate nodes are added, 
             * seriesScene.childNodes array is changed.
             * 
             * The var 'toChildIndex' takes inserts into account;
             * its value is always the index of 'toScene' in 
             * seriesScene.childNodes.
             */
            for(var c = 0, /* category index */
                    toChildIndex = 0,
                    pointCount = seriesScenes.length ; c < pointCount ; c++, toChildIndex++) {
                
                /* Complete toScene */
                var toScene = seriesScenes[toChildIndex];
                toScene.isSingle = !fromScene && !toScene.nextSibling;  // Look ahead
                
                /* Possibly create intermediate scene 
                 * (between fromScene and toScene)
                 */
                if(fromScene) {
                    var interScene = createIntermediateScene(
                            seriesScene,
                            fromScene, 
                            toScene,
                            toChildIndex);
                    
                    if(interScene){
                        toChildIndex++;
                    }
                }
                
                // --------
                
                fromScene = toScene;
            }
        }
        
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
    }