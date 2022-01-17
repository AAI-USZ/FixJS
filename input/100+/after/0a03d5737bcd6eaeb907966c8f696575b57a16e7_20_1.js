function (that) {
        var vocab = cspace.vocab.resolve({
            model: that.options.recordModel,
            recordType: that.model.recordType,
            vocab: that.vocab
        });
        return {
            recordType: {
                messagekey: "${recordType}",
                decorators: {"addClass": "{styles}.recordType"}
            },
            expander: {
                type: "fluid.renderer.condition",
                condition: vocab || false,
                trueTree: {
                    vocab: {
                        messagekey: "titlebar-vocab",
                        args: [that.options.parentBundle.resolve("vocab-" + vocab)],
                        decorators: {"addClass": "{styles}.vocab"}
                    }
                }
            },
            title: {
                value: that.buildTitle()
            }
        };
    }