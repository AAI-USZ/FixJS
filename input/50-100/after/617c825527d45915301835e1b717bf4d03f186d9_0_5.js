function(q){
    if(q === undefined) {
        return new def.NullQuery();
    }
    
    if(q instanceof def.Query){
        return q;
    }
    
    if(def.fun.is(q)){
        return new def.AdhocQuery(q);
    }

    return new def.ArrayLikeQuery(q);
}