function(layoutInfo){
        var positionProps = {
            left: null, 
            top:  null
        };
        var clientSize     = layoutInfo.clientSize;
        var requiredSize   = new pvc.Size(0,0);
        var paddedCellSize = new pvc.Size(0,0);
        var rootScene      = this._buildScene();
        var leafCount      = rootScene.childNodes.length;
        var maxLabelLen    = rootScene.vars.item.maxLabelTextLen;
        var overflowed = true;
        var clipPartialContent = false;
        
        function finish(){
            /** Other exports */
            def.copy(layoutInfo, {
                rootScene:  rootScene,
                leftProp:   positionProps.left,
                topProp:    positionProps.top,
                cellSize:   paddedCellSize,
                overflowed: overflowed
            });
            
            return requiredSize;
        }
        
        // No data or just one color with no text -> hide
        if(!leafCount || (leafCount === 1 && !maxLabelLen)){
            overflowed = false;
            return finish();
        }
        
        if(!(clientSize.width > 0 && clientSize.height > 0)){
            return finish();
        }
        
        var isV1Compat = (this.chart.options.compatVersion <= 1);
        
        // The size of the biggest cell
        var cellWidth = this.markerSize + this.textMargin + maxLabelLen; // ignoring textAdjust
        var cellHeight;
        if(isV1Compat){
            // Previously, the cellHeight was the padding.
            // As we now add the padding below, we put 0 here.
            cellHeight = 0;
        } else {
            cellHeight = Math.max(pvc.text.getTextHeight("M", this.font), this.markerSize);
        }
        
        paddedCellSize.width  = cellWidth  + this.padding;
        paddedCellSize.height = cellHeight + this.padding;
        
        // Names are for horizontal layout (anchor = top or bottom)
        var isHorizontal = this.anchor === 'top' || this.anchor === 'bottom';
        var a_top    = isHorizontal ? 'top' : 'left';
        var a_bottom = this.anchorOpposite(a_top);    // top or bottom
        var a_width  = this.anchorLength(a_top);      // width or height
        var a_height = this.anchorOrthoLength(a_top); // height or width
        var a_center = isHorizontal ? 'center' : 'middle';
        var a_left   = isHorizontal ? 'left' : 'top';
        var a_right  = this.anchorOpposite(a_left);   // left or right
        
        var maxCellsPerRow = ~~(clientSize[a_width] / paddedCellSize[a_width]); // ~~ <=> Math.floor
        if(!maxCellsPerRow){
            if(clipPartialContent){
                return finish();
            }
            maxCellsPerRow = 1;
        }
        
        var cellsPerRow = Math.min(leafCount, maxCellsPerRow);
        var rowWidth    = cellsPerRow * paddedCellSize[a_width];
        var rowCount    = Math.ceil(leafCount / cellsPerRow);
        var tableHeight = rowCount * paddedCellSize[a_height];
        
        if(tableHeight > clientSize[a_height]){
            tableHeight = clientSize[a_height];
            if(clipPartialContent){
                // reduce row count
                rowCount = ~~(tableHeight / paddedCellSize[a_height]);
                
                if(!rowCount){
                    // Nothing fits entirely
                    return finish();
                }
                
                var maxLeafCount = cellsPerRow * rowCount;
                while(leafCount > maxLeafCount){
                    rootScene.removeAt(leafCount--);
                }
            }
        }
        
        // ----------------------
        
        overflowed = false;
        
        // Request used width / all available width (V1)
        requiredSize[a_width ] = !isV1Compat ? rowWidth : clientSize[a_width];
        requiredSize[a_height] = tableHeight;
        
        // NOTE: V1 behavior requires keeping alignment code here
        // even if it is also being performed in the layout...
        
        // -----------------
        
        var leftOffset = 0;
        switch(this.align){
            case a_right:
                leftOffset = requiredSize[a_width] - rowWidth;
                break;
                
            case a_center:
                leftOffset = (requiredSize[a_width] - rowWidth) / 2;
                break;
        }
        
        positionProps[a_left] = function(){
            var col = this.index % cellsPerRow;
            return leftOffset + col * paddedCellSize[a_width];
        };
        
        // -----------------
        
        var topOffset = 0;
        positionProps[a_top] = function(){
            var row = ~~(this.index / cellsPerRow);  // ~~ <=> Math.floor
            return topOffset + row * paddedCellSize[a_height];
        };
        
        return finish();
    }