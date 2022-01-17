function (list) {
            var pagerModel = that.pager.model;
            var offset = pagerModel.pageIndex * pagerModel.pageSize;
            that.applier.requestChange("offset", offset);

            // TODO: THIS IS A HACK UNTIL THE SERVER SUPPORTS PAGINATION EVERYWHERE.
            if (list.length === 0 || that.options.stubbPagination) {
                that.applier.requestChange(fluid.model.composeSegments("list"), list);
            }
            fluid.each(list, function (row, index) {
                var fullIndex = offset + index;
                that.applier.requestChange(fluid.model.composeSegments("list", fullIndex), row);
            });
        }