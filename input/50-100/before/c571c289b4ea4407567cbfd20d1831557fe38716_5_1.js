function(v) {
               if (v.type == 'literal') { return v.value; }
               if (v.type == 'uri') { return get_model(v.value); }
               throw new Error("dont know how to handle ", v);
           }