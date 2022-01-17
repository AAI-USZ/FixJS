function data_where(whereSpec, keyArgs) {
    
    var orderBys = def.array.as(def.get(keyArgs, 'orderBy')),
        datumKeyArgs = def.create(keyArgs || {}, {
            orderBy: null
        });
    
    var query = def.query(whereSpec)
                   .selectMany(function(datumFilter, index){
                      if(orderBys) {
                          datumKeyArgs.orderBy = orderBys[index];
                      }
                      
                      return data_whereDatumFilter.call(this, datumFilter, datumKeyArgs);
                   }, this);
    
    return query.distinct(function(datum){ return datum.id; });
    
    /*
    // NOTE: this is the brute force / unguided algorithm - no indexes are used
    function whereDatumFilter(datumFilter, index){
        // datumFilter = {dimName1: [atom1, OR atom2, OR ...], AND ...}
        
        return def.query(this._datums).where(datumPredicate, this);
        
        function datumPredicate(datum){
            if((selected === null || datum.isSelected === selected) && 
               (visible  === null || datum.isVisible  === visible)) {
                var atoms = datum.atoms;
                for(var dimName in datumFilter) {
                    if(datumFilter[dimName].indexOf(atoms[dimName]) >= 0) {
                        return true;
                    }
                }   
            }
        }
    }
    */    
}