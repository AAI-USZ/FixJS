function(axis){
        var size = (axis.orientation === 'x') ?
                        this._mainContentPanel.width :
                        this._mainContentPanel.height;
        
        var scale = axis.scale;
        scale.min  = 0;
        scale.max  = size; 
        scale.size = size; // original size
        
        var axisOffset = axis.option('Offset');
        if(axisOffset > 0){
            var rOffset = size * axisOffset;
            scale.min += rOffset;
            scale.max -= rOffset;
            scale.offset = rOffset;
            scale.offsetSize = scale.max - scale.min;
        } else {
            scale.offset = 0;
            scale.offsetSize = scale.size;
        }
        
        if(scale.type === 'Discrete'){
            if(scale.domain().length > 0){ // Has domain? At least one point is required to split.
                var bandRatio = this.options.panelSizeRatio || 0.8;
                scale.splitBandedCenter(scale.min, scale.max, bandRatio);
            }
        } else {
            scale.range(scale.min, scale.max);
        }
        
        return scale;
    }