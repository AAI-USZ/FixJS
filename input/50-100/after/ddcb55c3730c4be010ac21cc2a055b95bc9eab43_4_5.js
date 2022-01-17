function (expander, handleFn, expandFn) {
        expandFn = expandFn || fluid.model.transform.expandValue;
        expander.expand = function (rules) {
            return expandFn(rules, expander);
        };
        expander.outputPrefixOp = fluid.model.makePathStack(expander, "outputPrefix");
        expander.inputPrefixOp = fluid.model.makePathStack(expander, "inputPrefix");
        expander.expanderHandler = handleFn;
    }