function (that, model, confirmation, parentBundle) {
        var removeMessage;
        that.refobjsDataSource.get({
            vocab: cspace.vocab.resolve({
                model: model,
                recordType: that.options.recordType,
                vocab: that.vocab
            }),
            csid: fluid.get(that.globalModel.model, "primaryModel.csid")
        }, function (data) {
            if (fluid.makeArray(data.items.length) > 0) {
                removeMessage = "deleteDialog-usedByMessage";
            }
            if (fluid.find(model.fields.narrowerContexts, function (element) {
                return element.narrowerContext || undefined;
            })) {
                removeMessage = "deleteDialog-hasNarrowerContextsMessage";
            } else if (model.fields.broaderContext) {
                removeMessage = "deleteDialog-hasBroaderContextMessage";
            }
            if (removeMessage) {
                confirmation.open("cspace.confirmation.deleteDialog", undefined, {
                    enableButtons: ["act"],
                    model: {
                        messages: [removeMessage],
                        messagekeys: {
                            actText: "alertDialog-actText"
                        }
                    },
                    termMap: [
                        parentBundle.resolve(that.options.recordType)
                    ],
                    parentBundle: parentBundle
                });
            } else {
                cspace.recordEditor.remover.remove(that);
            }
        });
    }