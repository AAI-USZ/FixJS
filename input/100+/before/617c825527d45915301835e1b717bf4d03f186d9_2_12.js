function(chart, type, index, roles, keyArgs){
    /*jshint expr:true */
    roles || def.fail.argumentRequired('roles');
    
    this.chart = chart;
    this.type  = type;
    this.index = index == null ? 0 : index;

    this.roles = def.array(roles);
    this.role  = this.roles[0];
    this.scaleType = groupingScaleType(this.role.grouping);

    // Role compatibility checks
    var L = this.roles.length;
    if(L > 1){
        var grouping = this.role.grouping, 
            i;
        if(this.scaleType === 'Discrete'){
            for(i = 1; i < L ; i++){
                if(grouping.id !== this.roles[i].grouping.id){
                    throw def.error.operationInvalid("Discrete roles on the same axis must have equal groupings.");
                }
            }
        } else {
            if(!grouping.firstDimension.type.isComparable){
                throw def.error.operationInvalid("Continuous roles on the same axis must have 'comparable' groupings.");
            }

            for(i = 1; i < L ; i++){
                if(this.scaleType !== groupingScaleType(this.roles[i].grouping)){
                    throw def.error.operationInvalid("Continuous roles on the same axis must have scales of the same type.");
                }
            }
        }
    }

    this.scale = def.get(keyArgs, 'scale');
    
    // ------------
    
    var options = chart.options;
    
    this.id = $VCA.getId(this.type, this.index);
    
    this.orientation = $VCA.getOrientation(this.type, options.orientation);
    this.orientedId  = $VCA.getOrientedId(this.orientation, this.index);
    this.optionsId   = $VCA.getOptionsId(this.orientation, this.index);
    
    this.upperOrientedId = def.firstUpperCase(this.orientedId);
    
    if(this.index !== 1) {
        this.isVisible = options['show' + this.upperOrientedId + 'Scale'];
    } else {
        this.isVisible = !!options.secondAxisIndependentScale; // options.secondAxis is already true or wouldn't be here
    }
}