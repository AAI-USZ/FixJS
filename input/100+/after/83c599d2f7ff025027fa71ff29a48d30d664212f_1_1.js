function(T) {
                   var val = T.fn(src_entity);
                   if (_(val).isArray()) {
                       var tails = _(val).filter(DEFINED).map(function(v) {
                           var chain_tail = rechain(v,target_type);
                           return chain_tail.map(function(tail_t) { return [[T,val]].concat(tail_t); });
                       });
                       return flatten(tails);                       
                   } else if (DEFINED(val)) {
		       // we got a value directly -- let's propagate that on 
                       var chain_tail = rechain(val,target_type);
                       return chain_tail.map(function(tail_t) { return [[T,val]].concat(tail_t); });
                   } else {
		       // not defined
		       return undefined;
		   }

               }