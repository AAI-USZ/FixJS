function(chart, parent, options){
        
        if(!options){
            options = {};
        }
        
        var anchor = options.anchor || this.anchor;
        var isVertical = anchor === 'top' || anchor === 'bottom';
        
        // Default value of align depends on anchor
        if(options.align === undefined){
            options.align = isVertical ? 'center' : 'middle';
        }
        
        // titleSize
        if(options.size == null){
            var size = options.titleSize;
            if(size != null){
                // Single size (a number or a string with only one number)
                // should be interpreted as meaning the orthogonal length.
                options.size = new pvc.Size()
                                      .setSize(size, {singleProp: this.anchorOrthoLength(anchor)});
            }
        }
        
        // titleSizeMax
        if(options.sizeMax == null){
            var sizeMax = options.titleSizeMax;
            if(sizeMax != null){
                // Single size (a number or a string with only one number)
                // should be interpreted as meaning the orthogonal length.
                options.sizeMax = new pvc.Size()
                                    .setSize(sizeMax, {singleProp: this.anchorOrthoLength(anchor)});
            }
        }
        
        if(options.paddings == null){
            options.paddings = this.defaultPaddings;
        }
        
        this.base(chart, parent, options);
        
        if(options.font === undefined){
            var extensionFont = this._getFontExtension();
            if(typeof extensionFont === 'string'){
                this.font = extensionFont;
            }
        }
    }