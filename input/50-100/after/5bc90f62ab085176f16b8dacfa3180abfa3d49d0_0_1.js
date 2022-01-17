function (entity, memberDefinition, newValue, valueNotSet) {
        ///<param name="entity" type="$data.Entity" />
        ///<param name="memberDefinition" type="$data.MemberDefinition" />
        var errors = [];
        var typeName = Container.resolveName(Container.resolveType(memberDefinition.dataType));
        var value = !valueNotSet ? newValue : entity[memberDefinition.name];
        this.fieldValidate(entity, memberDefinition, value, errors, typeName);
        return errors;
    }