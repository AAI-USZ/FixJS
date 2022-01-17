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
                    if (typeof(expandSpec.inputPath) === "string" && expandSpec.inputPath.indexOf("*") !== -1) {
                        expander.queued.push({expandSpec: expandSpec, outputPrefix: expander.outputPrefix, inputPrefix: expander.inputPrefix});
                        continue;
                    }
                    togo = fluid.model.transform.expandExpander(expandSpec, expander);
                }
            }
        } else {
            for (var key in rule) {
                var value = rule[key];
                expander.outputPrefixOp.push(key);
                expander.expand(value, expander);
                expander.outputPrefixOp.pop();
            }
            togo = fluid.get(expander.target, expander.outputPrefix);
        }
        return togo;
    }