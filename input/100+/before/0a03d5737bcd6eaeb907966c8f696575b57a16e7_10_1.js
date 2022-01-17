function (that) {
        var tree = cspace.recordList.produceTree(that);
        tree.expander[0].trueTree.expander[0].tree.expander.push({
            type: "fluid.renderer.condition",
            condition: that.options.showDeleteButton,
            trueTree: {
                deleteRelation: {
                    decorators: [{
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
                }
            }
        });
        return tree;
    }