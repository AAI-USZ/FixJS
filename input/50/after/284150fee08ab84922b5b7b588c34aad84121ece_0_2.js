function(v){
            return typeof v === 'function' ? v : def.fun.constant(v);
        }