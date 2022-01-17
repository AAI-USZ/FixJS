function (list) {
            var pagerModel = that.pager.model;
            var offset = pagerModel.pageIndex * pagerModel.pageSize;
            that.applier.requestChange("offset", offset);
            fluid.each(list, function (row, index) {
                var fullIndex = offset + index;
                that.applier.requestChange(fluid.model.composeSegments("list", fullIndex), row);
            });
        }