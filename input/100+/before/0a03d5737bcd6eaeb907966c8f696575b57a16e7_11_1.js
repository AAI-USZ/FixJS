function (rec) {
            if (!get(model, rec, elPaths.csid)) {
                return;
            }
            applier.requestChange(rec + ".target", fluid.stringTemplate(urls.navigate, {
                recordType: get(model, rec, elPaths.recordType),
                csid: get(model, rec, elPaths.csid)
            }));
        }