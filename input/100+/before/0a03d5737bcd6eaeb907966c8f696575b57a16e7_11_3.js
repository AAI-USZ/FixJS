function (callback, evt) {
            if (!evt) {
                return;
            }
            var target = $(evt.target);
            if (target.length === 0) {
                return;
            }
            searchReferenceStorage.set(fluid.find({
                "linkNext": 1,
                "linkPrevious": -1
            }, function (increment, selector) {
                if (that.locate(selector).attr("href") === target.attr("href")) {
                    return {
                        token: get(model, searchReference, elPaths.token),
                        index: get(model, searchReference, elPaths.index) + increment,
                        source: get(model, searchReference, elPaths.source)
                    };
                }
            }));
        }