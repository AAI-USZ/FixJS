function (model) {
        if (!model.fields) {
            return false;
        }
        if (!model.fields.blobCsid) {
            return false;
        }
        return !!(model.fields.blobs && model.fields.blobs.length > 0);
    }