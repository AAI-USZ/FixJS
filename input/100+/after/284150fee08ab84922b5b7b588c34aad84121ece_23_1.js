function(){

        this.base();

        var chart = this.chart,
            options = chart.options,
            isVertical = this.isOrientationVertical(),
            anchor = isVertical ? "bottom" : "left",
            ao = this.anchorOrtho(anchor),
            ruleRootScene = this._buildRuleScene(),
            orthoScale = chart.axes.ortho.scale,
            orthoPanelMargin = 0.04 * (orthoScale.range()[1] - orthoScale.range()[0]),
            orthoZero = orthoScale(0),
            sceneOrthoScale = chart.axes.ortho.sceneScale({sceneVarName: 'value'}),
            sceneBaseScale  = chart.axes.base.sceneScale({sceneVarName: 'category'}),
            baseScale = chart.axes.base.scale,
            barWidth2 = this.barWidth/2,
            barWidth = this.barWidth,
            barStepWidth = this.barStepWidth,
            isFalling = chart._isFalling,
            waterColor = chart._waterColor
            ;

        if(chart.options.showWaterGroupAreas){
            var panelColors = pv.Colors.category10();
            var waterGroupRootScene = this._buildWaterGroupScene();
            
            this.pvWaterfallGroupPanel = this.pvPanel.add(pv.Panel)
                .data(waterGroupRootScene.childNodes)
                .zOrder(-1)
                .fillStyle(function(scene){
                    return panelColors(0)/* panelColors(scene.vars.category.level - 1)*/.alpha(0.15);
                })
                [ao](function(scene){
                    var categVar = scene.vars.category;
                    return baseScale(categVar.leftValue) - barStepWidth / 2;
                })
                [this.anchorLength(anchor)](function(scene){
                    var categVar = scene.vars.category,
                        length = Math.abs(baseScale(categVar.rightValue) -
                                baseScale(categVar.leftValue))
                        ;

                    return length + barStepWidth;
                })
                [anchor](function(scene){
                    return orthoScale(scene.vars.value.bottomValue) - orthoPanelMargin/2;
                })
                [this.anchorOrthoLength(anchor)](function(scene){
                    return orthoScale(scene.vars.value.heightValue) + orthoPanelMargin;
                    //return chart.animate(orthoZero, orthoScale(scene.categ) - orthoZero);
                })
                ;
        }
        
        this.pvBar
            .sign()
            .override('baseColor', function(type){
                var color = this.base(type);
                if(type === 'fill'){
                    if(this.scene.vars.category.group._isFlattenGroup){
                        return pv.color(color).alpha(0.75);
                    }
                }
                
                return color;
            })
            ;
        
        this.pvWaterfallLine = new pvc.visual.Rule(this, this.pvPanel, {
                extensionId: 'barWaterfallLine',
                noTooltips:  false,
                noHoverable: false
            })
            .lockValue('data', ruleRootScene.childNodes)
            .optional('visible', function(){
                return ( isFalling && !!this.scene.previousSibling) ||
                       (!isFalling && !!this.scene.nextSibling);
            })
            .optional(anchor, function(){ 
                return orthoZero + chart.animate(0, sceneOrthoScale(this.scene) - orthoZero);
            })
            .optionalValue(this.anchorLength(anchor), barStepWidth + barWidth)
            .optional(ao,
                isFalling ?
                    function(){ return sceneBaseScale(this.scene) - barStepWidth - barWidth2; } :
                    function(){ return sceneBaseScale(this.scene) - barWidth2; })
            .override('baseColor', function(){ return this.delegate(waterColor); })
            .pvMark
            .svg({ 'stroke-linecap': 'round' })
            ;

        if(chart.options.showWaterValues){
            this.pvWaterfallLabel = this.pvWaterfallLine
                .add(pv.Label)
                [anchor](function(scene){
                    return orthoZero + chart.animate(0, sceneOrthoScale(scene) - orthoZero);
                })
                .visible(function(scene){
                     if(scene.vars.category.group._isFlattenGroup){
                         return false;
                     }

                     return isFalling || !!scene.nextSibling;
                 })
                [this.anchorOrtho(anchor)](sceneBaseScale)
                .textAlign(isVertical ? 'center' : 'left')
                .textBaseline(isVertical ? 'bottom' : 'middle')
                .textStyle(pv.Color.names.darkgray.darker(2))
                .textMargin(5)
                .text(function(scene){ return scene.vars.value.label; });
        }
    }