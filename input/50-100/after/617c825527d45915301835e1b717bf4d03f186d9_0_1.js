function(p, context){
        if(context){
            return function(){
                return context[p].apply(context, arguments); 
            };
        }
        
        /* floating method */
        return function(){
            return this[p].apply(this, arguments); 
        };
    }