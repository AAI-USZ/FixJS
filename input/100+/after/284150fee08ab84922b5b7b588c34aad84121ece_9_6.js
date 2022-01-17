function(){
        var myself = this,
            chart = this.chart,
            options  = chart.options,
            data = chart.data;

        var dMin = 10; // Minimum dx or dy for a rubber band selection to be relevant

        this._isRubberBandSelecting = false;

        // Rubber band
        var rubberPvParentPanel = this.pvRootPanel || this.pvPanel.paddingPanel,
            toScreen;
        
        var selectBar = this.selectBar = rubberPvParentPanel.add(pv.Bar)
            .visible(function() { return myself._isRubberBandSelecting; } )
            .left(function() { return this.parent.selectionRect.x; })
            .top(function() { return this.parent.selectionRect.y; })
            .width(function() { return this.parent.selectionRect.dx; })
            .height(function() { return this.parent.selectionRect.dy; })
            .fillStyle(options.rubberBandFill)
            .strokeStyle(options.rubberBandLine);
        
        // Rubber band selection behavior definition
        if(!this._getExtension('base', 'fillStyle')){
            rubberPvParentPanel.fillStyle(pvc.invisibleFill);
        }
        
        // NOTE: Rubber band coordinates are always transformed to canvas/client 
        // coordinates (see 'select' and 'selectend' events)
         
        var selectionEndedDate;
        rubberPvParentPanel
            .event('mousedown', pv.Behavior.selector(false))
            .event('select', function(){
                if(!myself._isRubberBandSelecting && !myself.isAnimating()){
                    var rb = this.selectionRect;
                    if(Math.sqrt(rb.dx * rb.dx + rb.dy * rb.dy) <= dMin){
                        return;
                    }

                    myself._isRubberBandSelecting = true;
                    
                    if(!toScreen){
                        toScreen = rubberPvParentPanel.toScreenTransform();
                    }
                    
                    myself.rubberBand = rb.clone().apply(toScreen);
                }

                selectBar.render();
            })
            .event('selectend', function(){
                if(myself._isRubberBandSelecting){
                    var ev = arguments[arguments.length - 1];
                    
                    if(!toScreen){
                        toScreen = rubberPvParentPanel.toScreenTransform();
                    }
                    
                    myself.rubberBand = this.selectionRect.clone().apply(toScreen);
                    
                    myself._isRubberBandSelecting = false;
                    selectBar.render(); // hide rubber band
                    
                    // Process selection
                    myself._dispatchRubberBandSelectionTop(ev);
                    
                    selectionEndedDate = new Date();
                    
                    myself.rubberBand = null;
                }
            });
        
        if(options.clearSelectionMode === 'emptySpaceClick'){
            rubberPvParentPanel
                .event("click", function() {
                    // It happens sometimes that the click is fired 
                    //  after mouse up, ending up clearing a just made selection.
                    if(selectionEndedDate){
                        var timeSpan = new Date() - selectionEndedDate;
                        if(timeSpan < 300){
                            selectionEndedDate = null;
                            return;
                        }
                    }
                    
                    if(data.owner.clearSelected()) {
                        myself._onSelectionChanged();
                    }
                });
        }
    }