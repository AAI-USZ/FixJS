function(force) {
        if(!this.pvPanel || force) {
            
            this.pvPanel = null;
            
            /* Layout */
            this.layout();
            
            var margins  = this._layoutInfo.margins;
            var paddings = this._layoutInfo.paddings;
            
            /* Protovis Panel */
            if(this.isTopRoot) {
                this.pvRootPanel = 
                this.pvPanel = new pv.Panel().canvas(this.chart.options.canvas);
                
                if(margins.width > 0 || margins.height > 0){
                    this.pvPanel
                        .width (this.width )
                        .height(this.height);
                    
                    // As there is no parent panel,
                    // the margins cannot be accomplished by positioning
                    // on the parent panel and sizing.
                    // We thus create another panel to be a child of pvPanel
                   
                    this.pvPanel = this.pvPanel.add(pv.Panel);
                }
            } else {
                this.pvPanel = this.parent.pvPanel.add(this.type);
            }
            
            var pvBorderPanel = this.pvPanel;
            
            // Set panel size
            var width  = this.width  - margins.width;
            var height = this.height - margins.height;
            pvBorderPanel
                .width (width)
                .height(height);
            
            // Set panel positions
            var hasPositions = {};
            def.eachOwn(this.position, function(v, side){
                pvBorderPanel[side](v + margins[side]);
                hasPositions[this.anchorLength(side)] = true;
            }, this);
            
            if(!hasPositions.width && margins.left > 0){
                pvBorderPanel.left(margins.left);
            }
            
            if(!hasPositions.height && margins.top > 0){
                pvBorderPanel.top(margins.top);
            }
            
            // Check padding
            if(paddings.width > 0 || paddings.height > 0){
                // We create separate border (outer) and inner (padding) panels
                this.pvPanel = pvBorderPanel.add(pv.Panel)
                                   .width (width  - paddings.width )
                                   .height(height - paddings.height)
                                   .left(paddings.left)
                                   .top (paddings.top );
            }
            
            pvBorderPanel.borderPanel  = pvBorderPanel;
            pvBorderPanel.paddingPanel = this.pvPanel;
            
            this.pvPanel.paddingPanel  = this.pvPanel;
            this.pvPanel.borderPanel   = pvBorderPanel;
            
            /* Protovis marks that are pvcPanel specific,
             * and/or #_creates child panels.
             */
            this._createCore(this._layoutInfo);
            
            /* RubberBand */
            if (this.isTopRoot && this.chart.options.selectable && pv.renderer() !== 'batik'){
                this._initRubberBand();
            }

            /* Extensions */
            this.applyExtensions();
        }
    }