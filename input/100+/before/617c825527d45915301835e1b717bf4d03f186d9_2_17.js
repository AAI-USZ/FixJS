function labelLayout(){
            var labelExtId = this.panelName + 'Label';
            
            var font = this.font;
                
            var align = this._getExtension(labelExtId, 'textAlign');
            if(typeof align !== 'string'){
                align = this.isAnchorTopOrBottom() ? 
                        "center" : 
                        (this.anchor == "left") ? "right" : "left";
            }
            
            var baseline = this._getExtension(labelExtId, 'textBaseline');
            if(typeof baseline !== 'string'){
                switch (this.anchor) {
                    case "right":
                    case "left":
                    case "center": 
                        baseline = "middle";
                        break;
                        
                    case "bottom": 
                        baseline = "top";
                        break;
                      
                    default:
                    //case "top": 
                        baseline = "bottom";
                        //break;
                }
            } 
            
            var angle  = def.number(this._getExtension(labelExtId, 'textAngle'),  0);
            var margin = def.number(this._getExtension(labelExtId, 'textMargin'), 3);
            
            var textHeight = pvc.text.getTextHeight("m", font);
            
            var textItems;
            if(this.isDiscrete){
                var data = this.chart.visualRoles(this.roleName)
                               .flatten(this.chart.data, {visible: true});
                
                textItems = def.query(data._children)
                               .select(function(child){ return child.absLabel; });
            } else {
                var ticks = pvc.scaleTicks(
                                scale,
                                this.domainRoundMode === 'tick',
                                this.desiredTickCount);
                
                textItems = def.query(ticks)
                                .select(function(tick){ return scale.tickFormat(tick); });
            }
            
            var textWidth = textItems
                                .select(function(text){ return 1.0 * pvc.text.getTextLength(text, font); })
                                .max();
            
            labelBBox = pvc.text.getLabelBBox(textWidth, textHeight, align, baseline, angle, margin);
            
            // The length not over the plot area
            var length;
            switch(this.anchor){
                case 'left':
                    length = -labelBBox.x;
                    break;
                
                case 'right':
                    length = labelBBox.x2;
                    break;
                    
                case 'top':
                    length = -labelBBox.y;
                    break;
                
                case 'bottom':
                    length = labelBBox.y2;
                    break;
            }
            
            length = Math.max(length, 0);
            
            // --------------
            
            this.axisSize = this.tickLength + length; 
            
            // Add equal margin on both sides?
            if(!(angle === 0 && this.isAnchorTopOrBottom())){
                // Text height already has some free space in that case
                // so no need to add more.
                this.axisSize += this.tickLength;
            }
        }