function(zeroBounded) {
    
    var min, max;
    if (zeroBounded){
        max = 0;
        min = 0;
    }
    else {
        max = Number.NEGATIVE_INFINITY;
        min = Number.POSITIVE_INFINITY;
    }
    
    for (var i = 0; i < data.sessions.length; i++) {
        for (var j = 0; j < data.fields.length; j++) {
            if (data.fields[j].visibility === 1 && data.sessions[i].visibility === 1 &&
                data.fields[j].name.toLowerCase() != "time") {
                max = Math.max(max, Math.max.apply(null, data.getDataFrom(i, j)));
                min = Math.min(min, Math.min.apply(null, data.getDataFrom(i, j)));
            }
        }
    }
    
    return [min, max];
}