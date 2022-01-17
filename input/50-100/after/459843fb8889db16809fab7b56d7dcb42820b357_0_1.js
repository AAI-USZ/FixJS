function(v) {
               if (v.type === 'literal') { return v.value; }
               if (v.type === 'uri') { return get_model(v.value); }
			   /// ASK MAX MIGHT BE WRONG
			   if (v.type === 'bnode') { console.log(v.value); return v.value; }
               throw new Error("dont know how to handle ", v);
           }