function (that) {
        var hashtoken = cspace.util.getUrlParameter("hashtoken");
        if (hashtoken) {
            // Only present on findedit and advanced search pages.
            var searchData;
            fluid.each([that.searchHistoryStorage, that.findeditHistoryStorage], function (storage) {
                if (storage.options.source !== that.options.source) {
                    return;
                }
                var history = storage.get();
                if (!history) {return;}
                searchData = fluid.find(history, function (search) {
                    if (search.hashtoken === hashtoken) {return search.model;}
                });
            });
            if (searchData) {
                that.updateModel(searchData);
            }
        } else {
            that.updateModel({
                keywords: decodeURI(cspace.util.getUrlParameter("keywords")),
                recordType: cspace.util.getUrlParameter("recordtype")
            });
        }
        that.hideResults();
        bindEventHandlers(that);
        if (that.model.searchModel.recordType) {
            that.events.onInitialSearch.fire();
        }
        that.events.ready.fire();
    }