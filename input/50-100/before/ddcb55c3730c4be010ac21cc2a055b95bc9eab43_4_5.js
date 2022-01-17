function (expander, expandFn) {
        expander.expand = function (rules) {
            return expandFn(rules, expander);
        };
    }