function (that) {
        
        cspace.globalEvents.setListeners({
            applier: that.globalModel.applier,
            model: that.globalModel.model,
            eventMap: {
                "primaryModel.csid": that.events.primaryRecordCreated
            }
        });
    
    }