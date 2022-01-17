function(axisType, axisIndex){
        var roles = def.array.as(this._axisRoleNameMap[axisType])
                        .map(function(roleName){
                            return this.visualRoles(roleName);
                        }, this);
        var axis = new pvc.visual.CartesianAxis(this, axisType, axisIndex, roles);
        
        this.axes[axis.id] = axis;
        this.axes[axis.orientedId] = axis;
        
        return axis;
    }