function(specText, type){
    if(!specText){
        return new pvc.data.GroupingSpec(null, type);
    }
    
    var levels;
    if(def.isArray(specText)) {
        levels = specText;
    } else if(def.isString(specText)) {
        levels = specText.split(/\s*,\s*/); 
    }

    var levelSpecs = def.query(levels)
               .select(function(levelText){
                   var dimSpecs = groupSpec_parseGroupingLevel(levelText, type);
                   return new pvc.data.GroupingLevelSpec(dimSpecs);
               });
    
    return new pvc.data.GroupingSpec(levelSpecs, type);
}