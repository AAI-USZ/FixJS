function (format) {
            var model = fluid.get(that.globalModel.model, "primaryModel");
            if (!model || !model.fields) {
                return that.formatMedia("", format);
            }
            var imgThumb;
            if (fluid.get(model, "fields.blobCsid")) {
                imgThumb = fluid.get(model, "fields.blobs.0.imgThumb");
            }
            if (imgThumb) {
                return that.formatMedia(imgThumb, format);
            }
            imgThumb = fluid.find(that.model.relatedMedia, function (thisMedia) {
                thisMedia = fluid.get(thisMedia, "summarylist.imgThumb");
                if (thisMedia) {return thisMedia;}
            });
            if (imgThumb) {
                return that.formatMedia(imgThumb, format);
            }
            return that.formatMedia("", format);
        }