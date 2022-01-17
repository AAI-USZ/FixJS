function(T) {
                   var val = T.fn(src_entity);
                   if (_(val).isArray()) {
                       var tails = _(val).filter(DEFINED).map(function(v) {
                           var chain_tail = me(v,target_type);
                           return chain_tail.map(function(tail_t) { return [[T,val]].concat(tail_t); });
                       });
                       return flatten(tails);                       
                   }
                   if (DEFINED(val)) {
                       var chain_tail = me(val,target_type);
                       return chain_tail.map(function(tail_t) { return [[T,val]].concat(tail_t); });
                   }
                   return undefined;
               }