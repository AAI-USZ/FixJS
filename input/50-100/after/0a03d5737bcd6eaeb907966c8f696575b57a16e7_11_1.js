function (increment) {
            var model = that.model,
                elPaths = that.options.elPaths,
                searchReference = elPaths.searchReference;

            if (typeof increment !== "number") {
                increment = 0;
            }
            that.searchReferenceStorage.set({
                token: get(model, searchReference, elPaths.token),
                index: get(model, searchReference, elPaths.index) + increment,
                source: get(model, searchReference, elPaths.source)
            });
        }