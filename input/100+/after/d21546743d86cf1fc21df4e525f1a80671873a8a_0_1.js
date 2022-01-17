function gatherRules(options, ruleset){
        var warnings = options.rules || options.warnings,
            errors = options.errors;
        
        if (warnings){
            ruleset = ruleset || {};
            warnings.split(",").forEach(function(value){
                ruleset[value] = 1;
            });
        }
        
        if (errors){
            ruleset = ruleset || {};
            errors.split(",").forEach(function(value){
                ruleset[value] = 2;
            });
        }
           
        return ruleset;
    }