function () {
            if (fluid.get(that.globalModel.model, "primaryModel.csid")) {
                that.events.primaryRecordCreated.fire();
            }
        }