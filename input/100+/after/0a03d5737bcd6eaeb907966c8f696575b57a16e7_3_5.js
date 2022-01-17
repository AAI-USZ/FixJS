function (model, applier, messageBase) {
        var exists = fluid.get(model, "templates")[model.recordType];
        applier.requestChange("templates", exists ? exists.templates : undefined);
        if (exists) {
            applier.requestChange("templateSelection", exists.templates[0]);
        }
        lookupNames(applier, messageBase, model.createFromList, "createFromNames", "createnew");
        lookupNames(applier, messageBase, model.templates, "templateNames", "template");

        var allVocabs = fluid.get(model, "vocabs");
        if (!allVocabs) {
            return;
        }
        var vocabsExist = allVocabs[model.recordType];
        if (!vocabsExist) {
            return applier.requestChange("vocabs", undefined);
        }
        var vocabs = [];
        fluid.each(vocabsExist, function (vocab) {
            vocabs.push(vocab);
        });
        applier.requestChange("vocabs", vocabs);
        applier.requestChange("vocabSelection", vocabs[0]);
        lookupNames(applier, messageBase, model.vocabs, "vocabNames", "vocab");
    }