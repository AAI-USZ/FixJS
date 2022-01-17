function(options){
        // Disable animation if environment doesn't support it
        if (!$.support.svg || pv.renderer() === 'batik') {
            options.animate = false;
        }
        
        // Sanitize some options
        if(options.showTooltips){
            var ts = options.tipsySettings;
            if(ts){
                ts = options.tipsySettings = def.create(ts);
                this.extend(ts, "tooltip_");
                if(ts.exclusionGroup === undefined) {
                    ts.exclusionGroup = 'chart';
                }
            }
        }
    }