function (newModel) {
            that.rollbackModel = newModel;
            that.unsavedChanges = false;
            that.events.onChange.fire(that.unsavedChanges);
        }