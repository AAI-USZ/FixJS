function($input) {
        //Check if the field is NOT required and empty
        if (!$input.attr('data-fjs-required') && $$.trim($input.val()).length == 0)
            return true;
        
        //Check if the field is REQUIRED and empty
        if ($input.attr('data-fjs-required')) {
            var isOk = true;
            if ($input.is(':checkbox')) {
                isOk = $input.is(':checked');
            } else {
                isOk = $$.trim($input.val()).length != 0;
            }
            if (!isOk) {
                var errorMessage = $input.attr('data-fjs-required_error_message');
                this.fieldErrors[$input.attr('name')] = errorMessage ? errorMessage : 'This field is required';
                return false;
            }
        }
        
        //Do other validation
        if (!$input.attr('data-fjs-validator')) {
            return true;
        }
        var fieldValidationResult = true;
        //Getting the list of validators
        var validators = $input.attr('data-fjs-validator').split(',');
        //Go over all assigned validators
        for (var i=0,c=validators.length; i<c; i++) {
            var validatorName = validators[i];
            var validatorInfo = this[validatorName];
            //If we have no registered validator
            if (!validatorInfo) {
                if ($$.fjs.config.debugMode)
                    $$.fjs.warn('Validator "'+validatorName+'" is not defined');
                
                this.fieldErrors[$input.attr('name')] = 'Validator does not exist';
                fieldValidationResult = false;
                return fieldValidationResult;
            }
            var validatorConfig = validatorInfo.config;
            //Go throught the config given and extract appropriate options from data-fjs-validator_option attributes
            $$.each(validatorInfo.config, function(pName){
                var paramName = 'data-fjs-'+validatorName+'_'+pName;
                if ($input.attr(paramName)) {
                    validatorConfig[pName] = $input.attr(paramName);
                }
            });
            //Do validation (call validation func)
            var validatorResult = validatorInfo.func($input.val(), validatorConfig, $input);
            if (!validatorResult) {
                this.fieldErrors[$input.attr('name')] = validatorConfig.error_message ? validatorConfig.error_message : validatorName;
            }
            fieldValidationResult = fieldValidationResult && validatorResult;
            if (!fieldValidationResult)
                return fieldValidationResult; //We show only one error at once
        }
        return fieldValidationResult;
    }