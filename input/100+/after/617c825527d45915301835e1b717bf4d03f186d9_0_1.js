function(o, path, create, dv){
        if(o && path != null){
            var parts = def.array.is(path) ? path : path.split('.');
            var L = parts.length;
            if(L){
                var i = 0;
                while(i < L){
                    var part = parts[i++];
                    var value = o[part];
                    if(value == null){
                        if(!create){ return dv; }
                        
                        value = o[part] = {};
                    }
                    o = value;
                }
            }
        }
        
        return o;
    }