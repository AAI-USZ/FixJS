function (model, targetPath, rule) {
        var expanded = {};
        for (var key in rule) {
            var value = rule[key];
            if (key === "expander") {
                var expanderFn = fluid.getGlobalValue(value.type);
                if (expanderFn) {
                    expanded = expanderFn.call(null, model, value, fluid.model.transformWithRules);
                }
            } else {
                expanded[key] = fluid.model.transformWithRules(model, value);
            }
        }
        return expanded;
    }