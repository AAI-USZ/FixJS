function(w, h, getFillColor){
        var myself = this,
            options = this.chart.options,
            data = this.chart.data,
            sizeDimName  = this.sizeDimName,
            colorDimName = this.colorDimName,
            nullShapeType = this.nullShape,
            shapeType = this.shape;
        
        /* SIZE RANGE */
        var maxRadius = Math.min(w, h) / 2;
        if(this.shape === 'diamond'){
            // Protovis draws diamonds inscribed on
            // a square with half-side radius*Math.SQRT2
            // (so that diamonds just look like a rotated square)
            // For the height of the dimanod not to exceed the cell size
            // we compensate that factor here.
            maxRadius /= Math.SQRT2;
        }

        // Small margin
        maxRadius -= 2;
        
        var maxArea  = maxRadius * maxRadius, // apparently treats as square area even if circle, triangle is different
            minArea  = 12,
            areaSpan = maxArea - minArea;

        if(areaSpan <= 1){
            // Very little space
            // Rescue Mode - show *something*
            maxArea = Math.max(maxArea, 2);
            minArea = 1;
            areaSpan = maxArea - minArea;
            
            if(pvc.debug >= 2){
                pvc.log("Using rescue mode dot area calculation due to insufficient space.");
            }
        }
        
        var sizeValueToArea;
        if(sizeDimName){
            /* SIZE DOMAIN */
            def.scope(function(){
                var sizeValExtent = data.dimensions(sizeDimName).extent({visible: true});
                if(sizeValExtent){
                    var sizeValMin  = sizeValExtent.min.value,
                        sizeValMax  = sizeValExtent.max.value,
                        sizeValSpan = Math.abs(sizeValMax - sizeValMin); // may be zero
                    
                    if(isFinite(sizeValSpan) && sizeValSpan > 0.00001) {
                        // Linear mapping
                        // TODO: a linear scale object??
                        var sizeSlope = areaSpan / sizeValSpan;
                        
                        sizeValueToArea = function(sizeVal){
                            return minArea + sizeSlope * (sizeVal == null ? 0 : (sizeVal - sizeValMin));
                        };
                    }
                }
            });
        }
        
        if(!sizeValueToArea) {
            sizeValueToArea = pv.functor(maxArea);
        }
        
        /* BORDER WIDTH & COLOR */
        var notNullSelectedBorder = (this.selectedBorder == null || (+this.selectedBorder) === 0) ? 
                                     this.defaultBorder : 
                                     this.selectedBorder;
        
        var nullSelectedBorder = (this.selectedBorder == null || (+this.selectedBorder) === 0) ? 
                                  this.nullBorder : 
                                  this.selectedBorder;
        
        var nullDeselectedBorder = this.defaultBorder > 0 ? this.defaultBorder : this.nullBorder;
        
        function getBorderWidth(){
            if(!sizeDimName || !myself._isNullShapeLineOnly() || this.parent.sizeValue() != null){
                return this.selected() ? notNullSelectedBorder : myself.defaultBorder;
            }

            // is null
            return this.selected() ? nullSelectedBorder : nullDeselectedBorder;
        }

        function getBorderColor(){
            var lineWidth = this.lineWidth();
            if(!(lineWidth > 0)){ //null|<0
                return null; // no style
            }
            
            var color = getFillColor.call(this.parent, false);
            return (data.owner.selectedCount() === 0 || this.selected()) ? 
                    color.darker() : 
                    color;
        }
        
        /* SHAPE TYPE & SIZE */
        var getShapeType;
        if(!sizeDimName) {
            getShapeType = def.fun.constant(shapeType);
        } else {
            getShapeType = function(){
                return this.parent.sizeValue() != null ? shapeType : nullShapeType;
            };
        }
        
        var getShapeSize;
        if(!sizeDimName){
            getShapeSize = function(){
                /* When neither color nor size dimensions */
                return (colorDimName && !nullShapeType && this.parent.colorValue() == null) ? 0 : maxArea;
            };
        } else {
            getShapeSize = function(){
                var sizeValue = this.parent.sizeValue();
                return (sizeValue == null && !nullShapeType) ? 0 : sizeValueToArea(sizeValue);
            };
        }
        
        // Panel
        return this.pvHeatGrid.add(pv.Dot)
            .localProperty("selected", Boolean)
            .selected(function(){ return this.datum().isSelected; })
            .shape(getShapeType)
            .shapeSize(getShapeSize)
            .lock('shapeAngle') // rotation of shapes may cause them to not fit the calculated cell. Would have to improve the radius calculation code.
            .fillStyle(function(){ return getFillColor.call(this.parent); })
            .lineWidth(getBorderWidth)
            .strokeStyle(getBorderColor)
            ;
    }