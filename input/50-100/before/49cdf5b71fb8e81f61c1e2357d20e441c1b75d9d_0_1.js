function(successCb, failureCb) {
        // we assume that physical computes don't have any parents
        if (!this.isPhysical()) {
            var computeStore = Ext.data.StoreManager.lookup('ComputesStore');
            var parentId = this.get('url').split('/')[2];
            computeStore.loadById(parentId, successCb, failureCb);
        }
    }