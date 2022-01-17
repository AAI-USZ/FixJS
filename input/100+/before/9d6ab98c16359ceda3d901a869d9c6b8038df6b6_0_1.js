function getUsedValues (element) {
        var matched_rules, rule, computed, style, property,
            used_values = {};
        // get the matched rules from all style sheets
        matched_rules = toArray(global.getMatchedCSSRules(element));
        // get the actual computed style
        //TODO: not supporting pseudo elements
        computed = global.getComputedStyle(element, null);

        // loop over the matched rules
        while ( rule = matched_rules.shift() ) {
            //for each rule convert rule.style into an array
            style = toArray(rule.style);
            // loop over the array of style properties
            while ( property = style.shift() ) {
                // if it's not in used_values and its value equals computed[property]
                if ( ! (property in used_values) && rule.style.getPropertyValue(property) === computed.getPropertyValue(property) ) {
                    used_values[property] = rule.style.getPropertyValue(property);
                }
            }
        }
        return used_values;
    }