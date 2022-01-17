function(ruleset, field) {
    var errors = [];
    var rules = {};

    if(field === undefined) {
        rules = ruleset;
    } else {
        rules[field] = ruleset[field];
    }

    for(var fieldName in rules) {
        if(rules.hasOwnProperty(fieldName)) {
            var rule = rules[fieldName];
            for(var i = 0, max = rule.length; i < max; i ++) {
                if(rule[i] === undefined) {
                    console.dir(rule);
                    console.dir(this);
                }
                if(!rule[i].call(this, this[fieldName])) {
                    errors.push(fieldName);
                }
            }
        }
    }

    return errors.length ? errors : true;
}