function data_processWhereSpec(whereSpec){
    var whereProcSpec = [];
    
    whereSpec = def.array.as(whereSpec);
    if(whereSpec){
        whereSpec.forEach(processDatumFilter, this);
    }
    
    return whereProcSpec;
    
    function processDatumFilter(datumFilter){
        if(datumFilter != null) {
            /*jshint expr:true */
            (typeof datumFilter === 'object') || def.fail.invalidArgument('datumFilter');
            
            /* Map: {dimName1: atoms1, dimName2: atoms2, ...} */
            var datumProcFilter = {},
                any = false;
            for(var dimName in datumFilter) {
                var atoms = processDimensionFilter.call(this, dimName, datumFilter[dimName]);
                if(atoms) {
                    any = true;
                    datumProcFilter[dimName] = atoms;
                }
            }
            
            if(any) {
                whereProcSpec.push(datumProcFilter);
            }
        }
    }
    
    function processDimensionFilter(dimName, values){
        // throws if it doesn't exist
        var dimension = this.dimensions(dimName),
            atoms = def.query(values)
                       .select(function(value){ return dimension.atom(value); }) // null if it doesn't exist
                       .where(def.notNully)
                       .distinct(function(atom){ return atom.key; })
                       .array();
        
        return atoms.length ? atoms : null;
    }
}