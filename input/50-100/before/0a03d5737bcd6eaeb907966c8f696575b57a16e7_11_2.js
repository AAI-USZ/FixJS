function (increment, selector) {
                if (that.locate(selector).attr("href") === target.attr("href")) {
                    return {
                        token: get(model, searchReference, elPaths.token),
                        index: get(model, searchReference, elPaths.index) + increment,
                        source: get(model, searchReference, elPaths.source)
                    };
                }
            }