f        if(mask == null || mask === '') {
            return "";
        }
        return mask.replace(/(^|[^{])\{([^{}]+)\}/g, function($0, before, prop){
            var value = scope ? scope[prop] : null;
            return before + (value == null ? "" : value); 
        });
    },
