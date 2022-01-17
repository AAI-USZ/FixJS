function(datums){
    if(!def.isArrayLike(datums)){
        datums = def.query(datums).array();
    }
    
    // Ensure null datums don't affect the result (null datums are always visible)
    var allVisible = def.query(datums).all(function(datum){ return datum.isVisible; });
    return pvc.data.Data.setVisible(datums, !allVisible);
}