function (that) {
        var tree = cspace.recordList.produceTree(that);
        tree.expander[0].trueTree.expander[0].tree.deleteRelation = {
            decorators: [{
                type: "fluid",
                func: "cspace.recordList.showDeleteRow",
                options: {
                    showDeleteButton: that.options.showDeleteButton,
                    row: "{row}",
                    model: fluid.get(that.model, that.options.elPaths.items)
                }
            }, {
                type: "addClass",
                classes: that.options.styles.deleteRelation
            }, {
                type: "attrs",
                attributes: {
                    alt: that.lookupMessage("tab-list-deleteRelation")
                }
            }, {
                type: "jQuery",
                func: "click",
                args: that.deleteRelation
            }]
        };
        return tree;
    }