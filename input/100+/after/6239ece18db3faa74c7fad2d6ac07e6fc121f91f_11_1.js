function(dv, p){
        var v, dvo;
        
        if(from){ 
            v = from[p];
        }
        
        if(v !== undefined){
            var vo = def.object.asNative(v);
            if(vo){
                dvo = def.object.asNative(dv);
                if(dvo){
                    v = def.create(dvo, vo);
                } // else, ignore dv
            } // else, simple value (null included) ignores dv
        }
        
        if(v === undefined){
            // Inherit default native objects
            dvo = def.object.asNative(dv);
            if(dvo){
                dv = Object.create(dvo);
            }
            v = dv;
        }
        
        to[p] = v;
    }