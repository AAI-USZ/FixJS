function(removals) {
        for (var itemId in removals) {
            // TODO: assumption that we only remove VMs is a strong one and won't hold for too long
            // Use removals[Id] for detecting the actual object type once we have >1 authoritive stores
            var store = Ext.getStore('ComputesStore');
            var item = store.findRecord('id', itemId);
            store.remove(item);
            Onc.EventBus.fireEvent('compute-remove', item);
        }
    }