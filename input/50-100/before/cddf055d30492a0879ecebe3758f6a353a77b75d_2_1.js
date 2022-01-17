function (thingBeingValidated) {
            var obj = {};
            for (i = 0; i < validatorFunctions.length; ++i) {
                //a little magic to keep the old API working
                if (validatorFunctions[i].validator.call(obj, thingBeingValidated) === false) {
                    if (obj.message !== undefined) {
                        errorMessage = obj.message;
                    }
                    return false;
                }
            }
            return true;
        }