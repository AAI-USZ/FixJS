function (elPaths, styles, tree, repeatID) {
        var preferred = elPaths.preferred,
            displayName = elPaths.displayName;
        
        tree.expander = fluid.makeArray(tree.expander);
        
        tree.expander.push({
            repeatID: repeatID,
            type: "fluid.renderer.repeat",
            pathAs: "row",
            valueAs: "rowValue",
            controlledBy: "matches",
            tree: {
                expander: [{
                    type: "fluid.renderer.condition",
                    condition: buildValueBinding(preferred),
                    trueTree: {
                        matchItemContent: {
                            value: buildValueBinding(displayName)
                        }
                    },
                    falseTree: {
                        matchItemContent: {
                            value: buildValueBinding(displayName),
                            decorators: {
                                type: "addClass",
                                classes: styles.nonPreferred
                            }
                        }
                    }
                }]
            }
        });
    }