function(v){
               if (v === undefined) { return; }
               if (v.length === 0) { return []; }
               if (v.length == 1) {  return _convert_helper(v[0]);       }
               return v.map(_convert_helper);
           }