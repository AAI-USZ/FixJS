function(removals) {
        for (var i = 0; i < removals.length; i++) {
        	// TODO: assumption that we only remove VMs is a strong one and won't hold for too long
            var store = Ext.getStore('ComputesStore');
            store.remove(store.findRecord('id', removals[i]));
        }
    }