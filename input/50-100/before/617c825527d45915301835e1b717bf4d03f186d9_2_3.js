function(datums){
    if(!def.isArrayLike(datums)){
        datums = def.query(datums).array();
    }
    
    // Ensure null datums don't affect the result
    var allSelected = def.query(datums).all(function(datum){ return datum.isNull || datum.isSelected; });
    return this.setSelected(datums, !allSelected);
}