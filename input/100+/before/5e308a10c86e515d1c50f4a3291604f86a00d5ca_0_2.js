function(chart, parent, options) {
        
        if(options && options.scenes){
            this._sceneExtensions = options.scenes;
            delete options.scenes;
        }
        
        // TODO: Danger...
        $.extend(this, options);
        
        this.chart = chart;

        this.position = {
            /*
            top:    0,
            right:  0,
            bottom: 0,
            left:   0
            */
        };
        
        this.margins  = new pvc.Sides(options && options.margins );
        this.paddings = new pvc.Sides(options && options.paddings);
        this.size     = new pvc.Size (options && options.size    );
        this.sizeMax  = new pvc.Size (options && options.sizeMax );
        
        if(!parent) {
            this.parent    = null;
            this.root      = this;
            this.topRoot   = this;
            this.isRoot    = true;
            this.isTopRoot = true;
            this.data      = this.chart.data;
            
        } else {
            this.parent    = parent;
            this.root      = parent.root;
            this.topRoot   = parent.topRoot;
            this.isTopRoot = false;
            this.isRoot    = (parent.chart !== chart);
            this.data      = parent.data; // TODO

            if(this.isRoot) {
                this.position.left = chart.left; 
                this.position.top  = chart.top;
            }
            
            parent._addChild(this);
        }
        
        /* Root panels do not need layout */
        if(this.isRoot) {
            this.anchor = null;
        }
    }