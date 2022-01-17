function keysWithCoercion(obj) {
     if(obj && obj.valueOf) {
       obj = obj.valueOf();
     }
     return object.keys(obj);
   }