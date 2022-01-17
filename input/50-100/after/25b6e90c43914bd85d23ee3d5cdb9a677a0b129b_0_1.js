function(cfg)
    {
        
        
        var clean_cfg = XObject.extend({
            font         :  false,
            drag_source : false,
            drag_dest   : false //,
       //     selection : false,
        }, cfg);
        
        delete clean_cfg.font;
        delete clean_cfg.selection;
        delete clean_cfg.drag_source;
        delete clean_cfg.drag_dest;
         
        
        XObject.call(this, clean_cfg);
        
        this.config = cfg;
        
        // this is an example...
        
        
    }