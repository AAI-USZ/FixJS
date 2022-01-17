function(chart, parent, options){
        if(!options){
            options = {};
        }
        
        var anchor = options.anchor || this.anchor;
        
        var isV1Compat = chart.options.compatVersion <= 1;
        var isVertical = anchor !== 'top' && anchor !== 'bottom';
        
        // Default value of align depends on anchor
        if(options.align == null){
            if(isVertical){
                options.align = 'top';
            } else if(isV1Compat) { // centered is better
                options.align = 'left';
            }
        }
        
        // legendSize
        if(options.size == null){
            var size = options.legendSize;
            if(size != null){
                // Single size (a number or a string with only one number)
                // should be interpreted as meaning the orthogonal length.
                options.size = new pvc.Size()
                                 .setSize(size, {singleProp: this.anchorOrthoLength(anchor)});
            }
        }
        
        // legendSizeMax
        if(options.sizeMax == null){
            var sizeMax = options.legendSizeMax;
            if(sizeMax != null){
                // Single size (a number or a string with only one number)
                // should be interpreted as meaning the orthogonal length.
                options.sizeMax = new pvc.Size()
                                    .setSize(sizeMax, {singleProp: this.anchorOrthoLength(anchor)});
            }
        }
        
        if(isV1Compat){
            if(options.padding === undefined){
                // Default value changed (and the meaning of the property also)
                options.padding = 24;
            }
            
            if(options.shape === undefined){
                options.shape = 'square';
            }
            
            // V1 minMarginX/Y were included in the size of the legend,
            // so these correspond to padding
            var minMarginX = Math.max(def.get(options, 'minMarginX', 8), 0);
            
            // V1 only implemented minMarginY for vertical and align = 'top'
            var minMarginY;
            if(isVertical && (options.align !== 'middle' && options.align !== 'bottom')){
                minMarginY = Math.max(def.get(options, 'minMarginY', 20) - 20, 0);
            } else {
                minMarginY = 0;
            }
            
            options.paddings = { left: minMarginX, top: minMarginY };
        } else {
            // Set default margins
            if(options.margins === undefined){
                options.margins = def.set({}, this.anchorOpposite(anchor), 10);
            }
        }
        
        this.base(chart, parent, options);
    }