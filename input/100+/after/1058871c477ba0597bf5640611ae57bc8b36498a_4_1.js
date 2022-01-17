function (obj) {
        store = this.getContact().getStore();
        store.setSorters(obj);
        store.load();
    }