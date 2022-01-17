function(cfg)
    {
        this.xconfig = {
            font         : cfg.font || false,
            drag_source : cfg.drag_source || false,
            drag_dest   : cfg.drag_dest || false
        };
        for (var i in this.xconfig) {
            if (typeof(cfg[i]) != 'undefined') {
                delete cfg[i];
            }
        }
        
        
        
        XObject.call(this, cfg);
        // this is an example...
        
        
    }