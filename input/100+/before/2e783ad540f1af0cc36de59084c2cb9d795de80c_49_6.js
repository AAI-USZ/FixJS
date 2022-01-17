function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":[{\"uuid\":\"testuuid1\",\"display\":\"testdoc1\"}," + "{\"uuid\":\"testuuid2\",\"display\":\"testdoc2\"}]}",
                status: 200
            };
            request.callback(null, true, response)
        });
        store = Ext.create('Screener.store.Doctors');
        expect(store.getData().getAt(0).getData().uuid).toEqual("testuuid1");
        expect(store.getData().getAt(0).getData().display).toEqual("testdoc1");
        expect(store.getData().getAt(1).getData().uuid).toEqual("testuuid2");
        expect(store.getData().getAt(1).getData().display).toEqual("testdoc2");
    }