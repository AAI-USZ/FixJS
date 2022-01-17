function(v) {
                           var chain_tail = me(v,target_type);
                           return chain_tail.map(function(tail_t) { return [[T,val]].concat(tail_t); });
                       }