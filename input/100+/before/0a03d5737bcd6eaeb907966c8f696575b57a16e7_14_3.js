function (event) {
                    var index = that.locate("resultsRow").index($(event.currentTarget));
                    var record = that.model.results[newModel.pageSize * newModel.pageIndex + index];
                    if (!record) {
                        return;
                    }
                    var expander = cspace.urlExpander({
                        vars: {
                            recordType: record.recordtype,
                            csid: record.csid
                        }
                    });
                    if (that.searchReferenceStorage) {
                        that.searchReferenceStorage.set({
                            token: that.model.pagination.traverser,
                            index: index + newModel.pageSize * newModel.pageIndex,
                            source: that.options.source
                        });
                    }
                    window.location = expander(that.options.urls.pivot);
                    return false;
                }