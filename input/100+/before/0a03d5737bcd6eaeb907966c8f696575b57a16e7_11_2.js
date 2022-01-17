function (storages, model, applier, elPaths, urls) {
        fluid.each([elPaths.next, elPaths.previous], function (rec) {
            if (!get(model, rec, elPaths.csid)) {
                return;
            }
            applier.requestChange(rec + ".target", fluid.stringTemplate(urls.navigate, {
                recordType: get(model, rec, elPaths.recordType),
                csid: get(model, rec, elPaths.csid)
            }));
        });
        applier.requestChange(fluid.model.composeSegments(elPaths.adjacentRecords, elPaths.userIndex),
            get(model, elPaths.adjacentRecords, elPaths.index) + 1);
        var hashtoken = get(model, elPaths.searchReference, elPaths.token),
            source = get(model, elPaths.searchReference, elPaths.source),
            returnToSearch;
        fluid.each(storages, function (storage) {
            if (storage.options.source !== source) {
                return;
            }
            var history = storage.get();
            if (!history) {
                return;
            }
            returnToSearch = fluid.find(history, function (search) {
                if (search.hashtoken === hashtoken) {
                    return {
                        hashtoken: hashtoken,
                        source: source
                    };
                }
            });
        });
        if (!returnToSearch) {
            return;
        }
        applier.requestChange(elPaths.returnToSearch, fluid.stringTemplate(urls.returnToSearch, returnToSearch));
    }