function (elm) {
            var maxWidth = that.options.constraints.maxImageWidth,
                maxHeight = that.options.constraints.maxImageHeight;
            if (elm.width() > maxWidth) {
                elm.height((maxWidth * elm.height()) / elm.width());
                elm.width(maxWidth);
            }
            if (elm.height() > maxHeight) {
                elm.width((elm.width() * maxHeight) / elm.height());
                elm.height(maxHeight);
            }
        }