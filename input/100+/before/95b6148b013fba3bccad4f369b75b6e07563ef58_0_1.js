function buildCFGraph(cfg, symbolObject){
    if(baseNode.isPrototypeOf(symbolObject)){
        //we've already processed this one.
        return symbolObject;
    }
    if(typeof symbolObject === "string"){
        symbolObject = { symbol : symbolObject };
    }
    if($.isArray(symbolObject)){
        var optionGroup = {items:[]};
        $.each(symbolObject, function(idx, item){
            optionGroup.items[idx] = buildCFGraph(cfg, item);
        });
        return inheritFrom(groupNode, optionGroup);
    }
    if(!symbolObject.symbol){
        //anonymous object
        symbolObject.symbol = 'gensym';
    }
    if(!symbolObject.options){
        if(symbolObject.symbol in cfg){
            symbolObject.options = cfg[symbolObject.symbol];
        } else {
            symbolObject.value = symbolObject.symbol;
            return inheritFrom(baseNode, symbolObject);
        }
    }
    var options = symbolObject.options;
    $.each(options, function(i){
        options[i] = buildCFGraph(cfg, options[i]);
    });
    return inheritFrom(baseNT, symbolObject);
}