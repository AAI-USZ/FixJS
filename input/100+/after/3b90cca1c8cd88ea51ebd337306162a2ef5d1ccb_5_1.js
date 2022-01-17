function() {
            var box = domGeom.getMarginBox(this.domNode),
                ratio = this.ratio,
                height = box.h,
                width = box.w,
                newHeight = 0,
                newWidth = 0;

            if (this.maxHeight)
                height = height > this.maxHeight ? this.maxHeight : height;

            if (!this.ratio)
            {
                domStyle.set(this.chartNode, {
                    height: height+'px',
                    width: width+'px'
                });
                return;
            }

            if (width > height && height * ratio < width)
            {
                newWidth = Math.floor(height * ratio);
                newHeight = height;
            }
            else
            {
                newWidth = width;
                newHeight = Math.floor(width / ratio);
            }

            domStyle.set(this.chartNode, {
                height: newHeight+'px',
                width: newWidth+'px'
            });
        }