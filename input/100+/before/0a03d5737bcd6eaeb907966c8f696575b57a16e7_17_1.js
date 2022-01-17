function () {
            var src = "";
            if (!that.model.fields) {
                return src;
            }
            if (!that.model.fields.blobCsid) {
                return src;
            }
            if (!that.model.fields.blobs) {
                return src;
            }
            if (that.model.fields.blobs.length <= 0) {
                return src;
            }
            return that.model.fields.blobs[0].imgMedium;
        }