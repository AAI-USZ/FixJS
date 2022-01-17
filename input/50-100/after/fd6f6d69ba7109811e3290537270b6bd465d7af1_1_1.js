function (that) {
        
        cspace.globalEvents.setListeners({
            applier: that.globalModel.applier,
            model: that.globalModel.model,
            eventMap: {
                "primaryModel.csid": that.events.primaryRecordCreated,
                "primaryModel.fields.blobs": that.events.primaryRecordMediaChanged
            }
        });
    
    }