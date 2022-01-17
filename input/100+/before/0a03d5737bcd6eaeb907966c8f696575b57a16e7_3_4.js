function (that) {
        return {
            "label": {
                messagekey: "${recordType}",
                decorators: {"addClass": "{styles}.label"}
            },
            radio: {
                decorators: [{
                    type: "jQuery",
                    func: "attr",
                    args: ["value", "${recordType}"]
                }, {
                    type: "jQuery",
                    func: "change",
                    args: function () {
                        that.updateCurrentSelection();
                    }
                }, {"addClass": "{styles}.radio"}]
            }, 
            expander: {
                type: "fluid.renderer.condition",
                condition: "${templates}",
                trueTree: {
                    templates: {decorators: [{"addClass": "{styles}.templates"}, {
                        type: "jQuery",
                        func: "hide"
                    }]},
                    expander: {                  
                        type: "fluid.renderer.selection.inputs",
                        rowID: "createFrom",
                        labelID: "createLabel",
                        inputID: "createInput",
                        selectID: "createFromSelect",
                        tree: {
                            "selection": "${createFromSelection}",
                            "optionlist": "${createFromList}",
                            "optionnames": "${createFromNames}"
                        }
                    },
                    templateSelection: {
                        optionnames: "${templateNames}",
                        optionlist: "${templates}",
                        selection: "${templateSelection}",
                        decorators: {"addClass": "{styles}.templateSelection"}
                    }
                },
                falseTree: {
                    templates: {
                        decorators: {
                            type: "jQuery",
                            func: "hide"
                        }
                    }
                }
            }
        };
    }