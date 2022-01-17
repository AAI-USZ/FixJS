function buildCFGraph(cfg, symbolObject){
    if(typeof symbolObject === "string"){
        symbolObject = { symbol : symbolObject };
    }
    if(baseNode.isPrototypeOf(symbolObject)){
        //we've already processed this one.
        return symbolObject;
    }
    if($.isArray(symbolObject)){
        $.each(symbolObject, function(idx, item){
            symbolObject[idx] = baseNode.create();//placeholder to stop infinite looping
            symbolObject[idx] = buildCFGraph(cfg, item);
        });
        return inheritFrom(groupNode, { items : symbolObject });
    }
    if(!symbolObject.symbol){
        symbolObject.symbol = 'anonymous object';
    }
    if(!symbolObject.options){
        if(symbolObject.symbol in cfg){
            symbolObject.options = cfg[symbolObject.symbol];
        } else {
            symbolObject.value = symbolObject.symbol;
            return inheritFrom(baseNode, symbolObject);
        }
    }
    $.each(symbolObject.options, function(idx, option){
        symbolObject.options[idx] = baseNode.create();//placeholder to stop infinite looping
        symbolObject.options[idx] = buildCFGraph(cfg, option);
    });
    return inheritFrom(baseNT, symbolObject);
}