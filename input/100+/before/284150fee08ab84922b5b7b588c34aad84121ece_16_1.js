function(){
        this.base();
        
        this.valueRoleName = this.chart.axes.ortho.role.name;

        var myself = this,
            chart = this.chart,
            options = chart.options,
            isStacked = this.stacked,
            showDots  = this.showDots,
            showAreas = this.showAreas,
            showLines = this.showLines,
            anchor = this.isOrientationVertical() ? "bottom" : "left";

        // ------------------
        // DATA
        var isBaseDiscrete = chart._catRole.grouping.isDiscrete(),
            data = this._getVisibleData(), // shared "categ then series" grouped data
            isDense = !(this.width > 0) || (data._children.length / this.width > 0.5), //  > 100 categs / 200 pxs
            rootScene = this._buildScene(data, isBaseDiscrete);

        // Disable selection?
        if(isDense && (options.selectable || options.hoverable)) {
            options.selectable = false;
            options.hoverable  = false;
            if(pvc.debug >= 3) {
                pvc.log("Warning: Disabling selection and hovering because the chart is to \"dense\".");
            }
        }
       
        // ---------------
        // BUILD
        this.pvPanel.zOrder(-7);

        this.pvScatterPanel = this.pvPanel.add(pv.Panel)
            .lock('data', rootScene.childNodes)
            ;
        
        // -- AREA --
        var areaFillColorAlpha = showAreas && showLines && !isStacked ? 0.5 : null;
        
        this.pvArea = new pvc.visual.Area(this, this.pvScatterPanel, {
                extensionId: 'area',
                antialias:   showAreas && !showLines,
                segmented:   !isDense,
                noHoverable: false // While the area itself does not change appearance, the pvLine does due to activeSeries... 
            })
            
            .lock('visible', def.retTrue)
            
            /* Data */
            .lock('data',   function(seriesScene){ return seriesScene.childNodes; }) // TODO
            
            /* Position & size */
            .override('x',  function(){ return this.scene.basePosition;  })
            .override('y',  function(){ return this.scene.orthoPosition; })
            .override('dy', function(){ return chart.animate(0, this.scene.orthoLength); })
            
            /* Color & Line */
            .override('color', function(type){
                return showAreas ? this.base(type) : null;
            })
            .override('baseColor', function(type){
                var color = this.base(type);
                if(color && !this.hasDelegate() && areaFillColorAlpha != null){
                    color = color.alpha(areaFillColorAlpha);
                }
                
                return color;
            })
            .override('fixAntialiasStrokeWidth', function(){
                // Hide a vertical line from 0 to the alone dot
                // Hide horizontal lines of nulls near zero
                if(this.scene.isNull || this.scene.isAlone) {
                     return 0;
                }

                return this.base();
            })
            .pvMark
            ;
        
        // -- LINE --
        var showDotsOnly = showDots && !showLines && !showAreas,
            
            /* When not showing lines, but showing areas,
             * we copy the area fillStyle so that
             * the line can cover the area and not be noticed.
             * We need this to hide the ladder 
             * on the border of the area, 
             * due to not using antialias.
             * 
             * When the scene has the active series,
             * the line is shown "highlighted" anyway.
             */
            lineCopiesAreaColor = !showLines && showAreas,
            
            /* When areas are shown with no alpha (stacked), 
             * make dots darker so they get 
             * distinguished from areas. 
             */
            darkerLineAndDotColor = isStacked && showAreas;
        
        function lineAndDotNormalColor(type){
            var color = this.base(type);
            if(color && darkerLineAndDotColor && !this.hasDelegate()){
                color = color.darker(0.6);
            }
            
            return color;
        }
        
        this.pvLine = new pvc.visual.Line(
            this, 
            this.pvArea.anchor(this.anchorOpposite(anchor)), 
            {
                extensionId: 'line',
                freePosition: true
            })
            /* 
             * Line.visible =
             *  a) showLines
             *     or
             *  b) (!showLines and) showAreas
             *      and
             *  b.1) discrete base and stacked
             *       and
             *       b.1.1) not null or is an intermediate null
             *  b.2) not null
             */
            .lock('visible',
                    showDotsOnly ? 
                    def.retFalse : 
                    (isBaseDiscrete && isStacked ? 
                    function(){ return !this.scene.isNull || this.scene.isIntermediate; } :
                    function(){ return !this.scene.isNull; })
            )
            
            /* Color & Line */
            .override('color', function(type){
                if(lineCopiesAreaColor && !this.scene.isActiveSeries()) {
                    // This obtains the color of the same index area
                    return myself.pvArea.fillStyle();
                }
                
                return this.base(type);
            })
            .override('baseColor', lineAndDotNormalColor)
            .override('baseStrokeWidth', function(){
                var strokeWidth;
                if(showLines){
                    strokeWidth = this.base();
                }
                
                return strokeWidth == null ? 1.5 : strokeWidth; 
            })
            .pvMark
            ;
        
           
        // -- DOT --
        var showAloneDots = !(showAreas && isBaseDiscrete && isStacked);
        
        this.pvDot = new pvc.visual.Dot(this, this.pvLine, {
                extensionId: 'dot',
                freePosition: true
            })
            .intercept('visible', function(){
                var scene = this.scene;
                return (!scene.isNull && !scene.isIntermediate && !scene.isInterpolated) && 
                       this.delegate(true);
            })
            .override('color', function(type){
                /* 
                 * Handle showDots
                 * -----------------
                 * Despite !showDots,
                 * show a dot anyway when:
                 * 1) it is active, or
                 * 2) it is single  (the only dot in its series and there's only one category) (and in areas+discreteCateg+stacked case)
                 * 3) it is alone   (surrounded by null dots) (and not in areas+discreteCateg+stacked case)
                 */
                if(!showDots){
                    var visible = this.scene.isActive ||
                                  (!showAloneDots && this.scene.isSingle) ||
                                  (showAloneDots && this.scene.isAlone);
                    if(!visible) {
                        return pvc.invisibleFill;
                    }
                }
                
                // Follow normal logic
                return this.base(type);
            })
            .override('baseColor', lineAndDotNormalColor)
            .override('baseSize', function(){
                /* When not showing dots, 
                 * but a datum is alone and 
                 * wouldn't be visible using lines or areas,  
                 * show the dot anyway, 
                 * with a size = to the line's width^2
                 * (ideally, a line would show as a dot when only one point?)
                 */
                if(!showDots) {
                    var visible = this.scene.isActive ||
                                  (!showAloneDots && this.scene.isSingle) ||
                                  (showAloneDots && this.scene.isAlone);
                    
                    if(visible && !this.scene.isActive) {
                        // Obtain the line Width of the "sibling" line
                        var lineWidth = Math.max(myself.pvLine.lineWidth(), 0.2) / 2;
                        return lineWidth * lineWidth;
                    }
                }
                
                return this.base();
            })
            .pvMark
            ;
        
        // -- LABEL --
        if(this.showValues){
            this.pvLabel = this.pvDot
                .anchor(this.valuesAnchor)
                .add(pv.Label)
                // ------
                .bottom(0)
                .text(function(scene){ return scene.acts[myself.valueRoleName].label; })
                ;
        }
    }