function (that) {
        return {
            createButton: {
                messagekey: "createButtonText",
                decorators: [{
                    type: "jQuery",
                    func: "click",
                    args: that.createRecord
                }, {"addClass": "{styles}.createButton"}]
            },
            createTemplateButton: {
                messagekey: "createTemplateButtonText",
                decorators: [{
                    type: "jQuery",
                    func: "click",
                    args: that.createTemplate
                }, {"addClass": "{styles}.createTemplateButton"}]
            },
            categories: {decorators: {"addClass": "{styles}.categories"}},
            expander: {
                repeatID: "category",
                type: "fluid.renderer.repeat",
                pathAs: "cat",
                controlledBy: "categories",
                tree: {
                    categoryHeader: {
                        messagekey: "${{cat}.name}",
                        decorators: {"addClass": "{styles}.categoryHeader"}
                    },
                    expander: {
                        repeatID: "rows",
                        type: "fluid.renderer.repeat",
                        pathAs: "rowdy",
                        valueAs: "rowdyVal",
                        controlledBy: "{cat}.arr",
                        tree: {
                            row: {
                                decorators: [{
                                    type: "fluid",
                                    func: "cspace.createNew.recordBox",
                                    options: {
                                        model: {
                                            recordType: "${{rowdyVal}}",
                                            templates: "${templateViews}",
                                            vocabs: "${vocabs}"
                                        }
                                    }
                                }, {"addClass": "{styles}.row"}]
                            }
                        }
                    }
                }
            }
        };
    }