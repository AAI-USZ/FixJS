function (row, index) {
                var fullIndex = offset + index;
                that.applier.requestChange(fluid.model.composeSegments("list", fullIndex), row);
            }