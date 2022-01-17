function(T) {
                   var val = T.fn(src_entity);
                   if (DEFINED(val)) {
                       var chain_tail = me(val,target_type);
                       return chain_tail.map(function(tail_t) { return [[T,val]].concat(tail_t); });
                   }
                   return undefined;
               }