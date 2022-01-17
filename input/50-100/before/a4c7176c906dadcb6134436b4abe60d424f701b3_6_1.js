function () {
        Util.saveBasicAuthHeader("admin", "Hello123");
        if (!store) {
            store = Ext.create('Screener.store.Doctors');
        }
        expect(store).toBeTruthy()
        waitsFor(

            function () {
                return !store.isLoading();
            }, "load never completed", timeout)
    }