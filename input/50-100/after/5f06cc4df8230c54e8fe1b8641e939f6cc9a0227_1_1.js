function (that) {
        that.getRelatedMedia();
        that.globalEvents.events.relationsUpdated.addListener(function (related) {
            if (related !== "media") {
                return;
            }
            that.getRelatedMedia();
        });
        
        that.options.recordApplier.modelChanged.addListener("fields.blobCsid", function () {
            if (fluid.get(that.options.recordModel, "fields.blobCsid")) {
                that.onRender();
            }
        });
    }