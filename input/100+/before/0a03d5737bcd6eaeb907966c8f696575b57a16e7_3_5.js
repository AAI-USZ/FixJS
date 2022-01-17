function (model, applier, messageBase) {
        var exists = fluid.get(model, "templates")[model.recordType];
        applier.requestChange("templates", exists ? exists.templates : undefined);
        if (exists) {
            applier.requestChange("templateSelection", exists.templates[0]);
        }
        lookupNames(applier, messageBase, model.createFromList, "createFromNames", "createnew");
        lookupNames(applier, messageBase, model.templates, "templateNames", "template");
    }