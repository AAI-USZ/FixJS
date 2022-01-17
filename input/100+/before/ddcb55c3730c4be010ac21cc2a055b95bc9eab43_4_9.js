function (rule, expander) {
        if (typeof(rule) === "string") {
            rule = fluid.model.transform.pathToRule(rule);
        }
        // special dispensation to allow "value" at top level
        // TODO: Proper escaping rules
        else if (rule.value && expander.outputPrefix !== "") {
            rule = fluid.model.transform.valueToRule(rule.value);
        }
        var togo;
        if (rule.expander) {
            var expanders = fluid.makeArray(rule.expander);
            for (var i = 0; i < expanders.length; ++ i) {
                var expandSpec = expanders[i];
                if (expander.inverting) {
                    var invertor = fluid.defaults(expandSpec.type).invertConfiguration;
                    if (invertor) {
                        var inverted = fluid.invokeGlobalFunction(invertor, [expandSpec, expander]);
                    }
                }
                else {
                    if (fluid.model.transform.maybePushWildcard(expander, expandSpec)) {
                        continue;
                    }
                    else {
                        togo = fluid.model.transform.expandExpander(expandSpec, expander);
                    }
                }
            }
        }
        // always apply rules with shortest keys first
        var keys = fluid.model.sortByKeyLength(rule);
        for (var i = 0; i < keys.length; ++ i) {
            var key = keys[i];
            if (key !== "expander") {
                var value = rule[key];
                expander.outputPrefixOp.push(key);
                expander.expand(value, expander);
                expander.outputPrefixOp.pop();
            }
        }
        togo = fluid.get(expander.target, expander.outputPrefix);
        return togo;
    }