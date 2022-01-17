function (newPagerModel, that) {
        var searchModel = that.model.searchModel;
        that.mainSearch.locate("searchQuery").val(searchModel.keywords);
        that.mainSearch.locate("recordTypeSelect").val(searchModel.recordType);
        displayLookingMessage(that.dom, searchModel.keywords, that.options.strings);
        var pagerModel = newPagerModel || that.resultsPager.model;
        that.updateModel({
            pageSize: pagerModel.pageSize,
            pageIndex: pagerModel.pageIndex,
            sortKey: pagerModel.sortKey,
            sortDir: pagerModel.sortDir
        });
        var url = that.buildUrl();
        that.events.onSearch.fire();
        fluid.log("Querying url " + url);
        fluid.fetchResources({
            results: {
                href: url,
                options: {
                    dataType: "json",
                    type: "GET",
                    success: function (data, textStatus) {
                        if (data.isError === true) {
                            fluid.each(data.messages, function (message) {
                                that.events.onError.fire("search", message.message);
                            });
                            return;
                        }
                        that.applyResults(data);
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        that.events.onError.fire("search", textStatus);
                    }
                }
            }
        });
    }