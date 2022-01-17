function (entity, memberDefinition, value, errors, validationTypeName) {
        ///<param name="memberDefinition" type="$data.MemberDefinition" />
        ///<param name="value" type="Object" />
        ///<param name="errors" type="Array" />
        ///<param name="validationTypeName" type="string" />
        if ((entity.entityState == $data.EntityState.Modified && entity[memberDefinition.name] == undefined))
            return;

        var validatonGroup = this.supportedValidations[validationTypeName];
        if (validatonGroup) {
            var validations = Object.keys(validatonGroup);
            validations.forEach(function (validation) {
                if (memberDefinition[validation] && validatonGroup[validation] && !validatonGroup[validation].call(entity, value, this.getValidationValue(memberDefinition, validation)))
                    errors.push(this.createValidationError(memberDefinition, validation, 'Validation error!'));
            }, this);
        }
    }