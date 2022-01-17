function(contentOptions){
        var options = this.options;
        if(pvc.debug >= 3){
            pvc.log("Prerendering in CartesianAbstract");
        }
        
        /* Create the grid/docking panel */
        this._gridDockPanel = new pvc.CartesianGridDockingPanel(this, this.basePanel, contentOptions);
        
        /* Create axes */
        var baseAxis   = this._createAxis('base',  0),
            orthoAxis  = this._createAxis('ortho', 0),
            ortho2Axis = options.secondAxis ? this._createAxis('ortho', 1) : null;
        
        /* Create child axis panels
         * The order is relevant because of docking order. 
         */
        if(ortho2Axis) {
            this._createAxisPanel(ortho2Axis);
        }
        this._createAxisPanel(baseAxis );
        this._createAxisPanel(orthoAxis);
        
        /* Create scales without range yet */
        this._createAxisScale(baseAxis );
        this._createAxisScale(orthoAxis);
        if(ortho2Axis){
            this._createAxisScale(ortho2Axis);
        }
        
        /* Create main content panel */
        this._mainContentPanel = this._createMainContentPanel(this._gridDockPanel);
        
        /* Force layout */
        this.basePanel.layout();
        
        /* Set scale ranges, after layout */
        this._setAxisScaleRange(baseAxis );
        this._setAxisScaleRange(orthoAxis);
        if(ortho2Axis){
            this._setAxisScaleRange(ortho2Axis);
        }
    }