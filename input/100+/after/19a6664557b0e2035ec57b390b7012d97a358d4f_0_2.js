function (observable) {
        var i = 0,
            rule, // the rule validator to execute
            ctx, // the current Rule Context for the loop
            ruleContexts = observable.rules(), //cache for iterator
            len = ruleContexts.length; //cache for iterator  
        
						// If there is an assigned error rule then check to see if it is still an error, if it isn't reset the valid status
            if(observable.errorRule) {
                if(validateSync(observable,observable.errorRule,observable.errorContext)) {
                    observable.error = null;
                    observable.__valid__(true);
                }
            }

        for (; i < len; i++) {

            //get the Rule Context info to give to the core Rule
            ctx = ruleContexts[i];

            //get the core Rule to use for validation
            rule = ko.validation.rules[ctx.rule];

            if (rule['async'] || ctx['async']) {
                //run async validation
                validateAsync(observable, rule, ctx);

            } else {
                //run normal sync validation
                if (!validateSync(observable, rule, ctx)) {
                    return false; //break out of the loop
                }
            }
        }
        //finally if we got this far, make the observable valid again!
        observable.error = null;
        observable.__valid__(true);
        return true;
    }