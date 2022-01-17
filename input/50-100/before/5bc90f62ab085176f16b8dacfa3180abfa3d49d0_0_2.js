function (validation) {
                if (memberDefinition[validation] && validatonGroup[validation] && !validatonGroup[validation](value, this.getValidationValue(memberDefinition, validation)))
                    errors.push(this.createValidationError(memberDefinition, validation, 'Validation error!'));
            }