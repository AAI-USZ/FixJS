function (rules) {
        var expander = {
            inverted: []
        };
        fluid.model.transform.makeExpander(expander, fluid.model.transform.handleInvertExpander);
        expander.expand(rules);
        return {
            expander: expander.inverted
        };
    }