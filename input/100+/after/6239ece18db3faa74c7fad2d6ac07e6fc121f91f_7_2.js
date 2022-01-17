function groupSpec_parseGroupingLevel(groupLevelText, type) {
    /*jshint expr:true */
    def.string.is(groupLevelText) || def.fail.argumentInvalid('groupLevelText', "Invalid grouping specification.");
    
    return def.query(groupLevelText.split(/\s*\|\s*/))
       .where(def.truthy)
       .select(function(dimSpecText){
            var match   = groupSpec_matchDimSpec.exec(dimSpecText) ||
                            def.fail.argumentInvalid('groupLevelText', "Invalid grouping level syntax '{0}'.", [dimSpecText]),
                name    = match[1],
                order   = (match[2] || '').toLowerCase(),
                reverse = order === 'desc';
               
            var dimSpec = new pvc.data.GroupingDimensionSpec(name, reverse, type);
            return dimSpec;
        });
}