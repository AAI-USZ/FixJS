function makeDatamodelClosures(datamodel){
    var vars = [];
    for(var id in datamodel){
        vars.push( '"' + id + '" : {\n' + 
            '"set" : function(v){ return ' + id + ' = v; },\n' + 
            '"get" : function(){ return ' + id + ';}' + 
        '\n}');
    }
    return vars.length ? '{\n' + vars.join(',\n') + '\n}' : '';
}