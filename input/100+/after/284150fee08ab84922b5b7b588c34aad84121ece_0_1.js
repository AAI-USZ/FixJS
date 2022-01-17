f        if(mask == null || mask === '') {
            return "";
        }
        
        var isScopeFun = scope && def.fun.is(scope);
        
        return mask.replace(/(^|[^{])\{([^{}]+)\}/g, function($0, before, prop){
            var value;
            if(scope){
                if(isScopeFun){
                    value = scope.call(ctx, prop);
                } else {
                    value = scope[prop];
                }
            } else {
                value = null;
            }
            
            // NOTE: calls .toString() of value as a side effect of the + operator
            return before + (value == null ? "" : value);
        });
    },
