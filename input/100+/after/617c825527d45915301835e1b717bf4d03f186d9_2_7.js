function(specText, type){
    if(!specText){
        return new pvc.data.GroupingSpec(null, type);
    }
    
    var levels;
    if(def.array.is(specText)) {
        levels = specText;
    } else if(def.string.is(specText)) {
        levels = specText.split(/\s*,\s*/); 
    }

    var levelSpecs = def.query(levels)
               .select(function(levelText){
                   var dimSpecs = groupSpec_parseGroupingLevel(levelText, type);
                   return new pvc.data.GroupingLevelSpec(dimSpecs);
               });
    
    return new pvc.data.GroupingSpec(levelSpecs, type);
}