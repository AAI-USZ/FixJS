function(){

        this.base();
        
        var rootScene = this._buildScene();

        var a_bottom = this.isOrientationVertical() ? "bottom" : "left",
            a_left   = this.anchorOrtho(a_bottom),
            a_width  = this.anchorLength(a_bottom),
            a_height = this.anchorOrthoLength(a_bottom),
            strokeColor  = pv.color(this.boxplotColor),
            boxFillColor = pv.color('limegreen')
            ;

        /* Category Panel */
        this.pvBoxPanel = this.pvPanel.add(pv.Panel)
            .data(rootScene.childNodes)
            [a_left ](function(scene){
                var catAct = scene.acts.category;
                return catAct.x - catAct.width / 2;
            })
            [a_width](function(scene){ return scene.acts.category.width; })
            ;

        /* V Rules */
        function setupVRule(rule){
            rule.lock(a_left, function(){ 
                    return this.pvMark.parent[a_width]() / 2;
                })
                .override('defaultColor', function(type){
                    if(type === 'stroke') { 
                        return strokeColor;
                    }
                })
                ;

            return rule;
        }

        this.pvVRuleTop = setupVRule(new pvc.visual.Rule(this, this.pvBoxPanel, {
                extensionId:  'boxVRule',
                freePosition: true,
                noHoverable:  false
            }))
            .intercept('visible', function(scene){
                return scene.acts.category.showVRuleAbove && this.delegate(true);
            })
            .lock(a_bottom, function(scene){ return scene.acts.category.vRuleAboveBottom; })
            .lock(a_height, function(scene){ return scene.acts.category.vRuleAboveHeight; })
            .pvMark
            ;

        this.pvVRuleBot = setupVRule(new pvc.visual.Rule(this, this.pvBoxPanel, {
                extensionId:  'boxVRule',
                freePosition: true,
                noHoverable:  false
            }))
            .intercept('visible', function(scene){
                return scene.acts.category.showVRuleBelow && this.delegate(true);
            })
            .lock(a_bottom, function(scene){ return scene.acts.category.vRuleBelowBottom; })
            .lock(a_height, function(scene){ return scene.acts.category.vRuleBelowHeight; })
            .pvMark
            ;

        /* Box Bar */
        function setupHCateg(sign){
            sign.lock(a_left,  function(scene){ return scene.acts.category.boxLeft;  })
                .lock(a_width, function(scene){ return scene.acts.category.boxWidth; })
                ;
            
            return sign;
        }

        this.pvBar = setupHCateg(new pvc.visual.Bar(this, this.pvBoxPanel, {
                extensionId: 'boxBar',
                freePosition: true,
                normalStroke: true
            }))
            .intercept('visible', function(scene){
                return scene.acts.category.showBox && this.delegate(true);
            })
            .lock(a_bottom, function(scene){ return scene.acts.category.boxBottom; })
            .lock(a_height, function(scene){ return scene.acts.category.boxHeight; })
            .override('defaultColor', function(type){
                switch(type){
                    case 'fill':   return boxFillColor;
                    case 'stroke': return strokeColor;
                }
            })
            .override('defaultStrokeWidth', def.constant(1))
            .pvMark
            ;

        /* H Rules */
        function setupHRule(rule){
            setupHCateg(rule);
            
            rule.override('defaultColor', function(type){
                    if(type === 'stroke') { return strokeColor; }
                })
                ;
            return rule;
        }
        
        this.pvHRule5 = setupHRule(new pvc.visual.Rule(this, this.pvBoxPanel, {
                extensionId:  'boxHRule5',
                freePosition: true,
                noHoverable:  false
            }))
            .intercept('visible', function(){
                return this.scene.acts.percentil5.value != null && this.delegate(true);
            })
            .lock(a_bottom,  function(){ return this.scene.acts.percentil5.position; }) // bottom
            .pvMark
            ;

        this.pvHRule95 = setupHRule(new pvc.visual.Rule(this, this.pvBoxPanel, {
                extensionId:  'boxHRule95',
                freePosition: true,
                noHoverable:  false
            }))
            .intercept('visible', function(){
                return this.scene.acts.percentil95.value != null && this.delegate(true);
            })
            .lock(a_bottom,  function(){ return this.scene.acts.percentil95.position; }) // bottom
            .pvMark
            ;

        this.pvHRule50 = setupHRule(new pvc.visual.Rule(this, this.pvBoxPanel, {
                extensionId:  'boxHRule50',
                freePosition: true,
                noHoverable:  false
            }))
            .intercept('visible', function(){
                return this.scene.acts.median.value != null && this.delegate(true);
            })
            .lock(a_bottom,  function(){ return this.scene.acts.median.position; }) // bottom
            .override('defaultStrokeWidth', def.constant(2))
            .pvMark
            ;
    }