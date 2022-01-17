function (that, data) {
        var searchModel = that.model.searchModel;
        var offset = searchModel.pageIndex * searchModel.pageSize;
        that.applier.requestChange("pagination", data.pagination);
        fluid.each(data.results, function (row, index) {
            var fullIndex = offset + index;
            if (!that.model.results[fullIndex]) {
                row.selected = false;
                that.applier.requestChange(fluid.model.composeSegments("results", fullIndex), row);
            }
        });
        that.applier.requestChange("searchModel.renderRequest", true);
        that.events.modelChanged.fire();
    }