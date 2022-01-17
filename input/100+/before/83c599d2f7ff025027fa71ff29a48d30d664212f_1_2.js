function(src_entity, target_type) {
               // forward chains from the src_entity to the target_type
               var me = arguments.callee;
               if (satisfies(src_entity, target_type)) { return [[]]; } // goal achieved.

               // find transforms that will give us our current destination
               var selected_Ts = TRANSFORMERS.filter(function(T) {  return satisfies(src_entity, T.domain); });
               var next = selected_Ts.map(function(T) {
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
               }).filter(DEFINED);
           
               return flatten(next);
           }