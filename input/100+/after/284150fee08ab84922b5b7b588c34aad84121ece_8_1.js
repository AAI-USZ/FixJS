function(keyArgs) {
        var options = this.options;
        
        /* Increment pre-render version to allow for cache invalidation  */
        this._preRenderVersion++;
        
        this.isPreRendered = false;

        if(pvc.debug >= 3){
            pvc.log("Prerendering in pvc");
        }
        
        if (!this.parent) {
            // If we don't have data, we just need to set a "no data" message
            // and go on with life.
            // Child charts are created to consume *existing* data
            if(!this.allowNoData && this.resultset.length === 0) {
                /*global NoDataException:true */
                throw new NoDataException();
            }
            
            // Now's as good a time as any to completely clear out all
            //  tipsy tooltips
            pvc.removeTipsyLegends();
        }

        /* Options may be changed between renders */
        this._processOptions();
        
        /* Initialize root chart roles */
        if(!this.parent && this._preRenderVersion === 1) {
            this._initVisualRoles();
            this._bindVisualRolesPre();
        }

        /* Initialize the data engine */
        this._initData(keyArgs);

        /* Create color schemes */
        this.colors = pvc.createColorScheme(options.colors);

        if(options.secondAxis){
            var ownColors = options.secondAxisOwnColors;
            if(ownColors == null){
                ownColors = options.compatVersion <= 1;
            }
            
            if(ownColors){
                /* if secondAxisColor is unspecified, assumes default color scheme. */
                this.secondAxisColor = pvc.createColorScheme(options.secondAxisColor);
            }
        }
        
        /* Initialize chart panels */
        this._initBasePanel();
        this._initTitlePanel();
        this._initLegend();
        
        if(!this.parent && this._isRoleAssigned('multiChartColumn')) {
            this._initMultiChartPanel();
        } else {
            this._preRenderContent({
                margins:  options.contentMargins,
                paddings: options.contentPaddings
            });
        }

        this.isPreRendered = true;
    }