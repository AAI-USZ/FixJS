function (rec) {
            if (!get(model, rec, elPaths.csid)) {
                return;
            }
            var vocab = cspace.vocab.resolve({
                model: get(model, rec),
                recordType: get(model, rec, elPaths.recordType),
                vocab: vocabComponent
            });
            applier.requestChange(rec + ".target", fluid.stringTemplate(urls.navigate, {
                recordType: get(model, rec, elPaths.recordType),
                csid: get(model, rec, elPaths.csid),
                vocab: vocab ? ("?" + $.param({vocab: vocab})) : ""
            }));
        }