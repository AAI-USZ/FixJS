function (format) {
            if (!that.model.fields) {
                return that.formatMedia("", format);
            }
            var imgThumb;
            if (fluid.get(that.model, "fields.blobCsid")) {
                imgThumb = fluid.get(that.model, "fields.blobs.0.imgThumb");
            }
            if (imgThumb) {
                return that.formatMedia(imgThumb, format);
            }
            imgThumb = fluid.get(that.model, "relations.media.0.summarylist.imgThumb");
            if (imgThumb) {
                return that.formatMedia(imgThumb, format);
            }
            return that.formatMedia("", format);
        }