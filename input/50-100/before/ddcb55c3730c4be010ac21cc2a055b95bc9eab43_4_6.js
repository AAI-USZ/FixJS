function (rules) {
        var expander = {
            inverted: [],
            inverting: true
        };
        fluid.model.transform.makeExpander(expander, fluid.model.transform.expandValue);
        expander.expand(rules);
        return {
            expander: expander.inverted
        };
    }