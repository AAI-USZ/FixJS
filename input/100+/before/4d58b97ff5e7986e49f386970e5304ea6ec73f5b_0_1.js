function (that) {
        that.rollbackModel = fluid.copy(that.model);
        that.unsavedChanges = false;
        that.applier.modelChanged.addListener("", function () {
            that.unsavedChanges = true;
            that.events.onChange.fire(that.unsavedChanges);
        });
        that.revert = function () {
            that.applier.requestChange("", that.rollbackModel);
            that.unsavedChanges = false;
            that.events.onChange.fire(that.unsavedChanges);
        };
    }