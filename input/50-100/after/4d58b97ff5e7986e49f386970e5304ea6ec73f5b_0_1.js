function (data) {
            if (data.isError) {
                recordEditor.events.onError.fire(data, "save");
                return;
            }
            if (!recordEditor.model.csid) {
                recordEditor.events.afterCreate.fire(data);
            }
            recordEditor.applier.requestChange("", data);
            recordEditor.globalModel.requestChange(recordEditor.options.globalRef, data);
            recordEditor.events.afterSave.fire(data);
        }