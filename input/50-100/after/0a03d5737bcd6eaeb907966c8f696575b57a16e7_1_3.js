function (tree, repeatID, listPath, fieldName) {
        tree.expander = fluid.makeArray(tree.expander);
        tree.expander.push({
            repeatID: repeatID,
            type: "fluid.renderer.repeat",
            pathAs: "row",
            controlledBy: listPath,
            tree: buildValueBinding(fieldName)
        });
    }