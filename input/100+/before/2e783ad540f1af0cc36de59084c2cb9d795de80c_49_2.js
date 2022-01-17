function() {
		spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"d9ec83e6-be4b-4622-8ee4-da64b7d8f54b\",\"display\":\"SCREENER 30/06/2012\",\"encounterDatetime\":\"2012-06-30T12:10:38.000+0400\",\"patient\":{\"uuid\":\"fcd0f543-c27e-11e1-9262-a5fbf9edb8d2\",\"display\":\"Mr. John D Patient\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/person/fcd0f543-c27e-11e1-9262-a5fbf9edb8d2\",\"rel\":\"self\"}]},\"location\":{\"uuid\":\"b0831208-7c15-4f08-80b9-35b83ad833c6\",\"display\":\"Waiting Patient: Screener - patients assigned to a doctor\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v2/location/b0831208-7c15-4f08-80b9-35b83ad833c6\",\"rel\":\"self\"}]},\"form\":null,\"encounterType\":{\"uuid\":\"88929d98-a0f6-4874-b185-a11322ea7e95\",\"display\":\"SCREENER - encountered when patient screened\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encountertype/88929d98-a0f6-4874-b185-a11322ea7e95\",\"rel\":\"self\"}]},\"provider\":{\"uuid\":\"fcd0f2cc-c27e-11e1-9262-a5fbf9edb8d2\",\"display\":\"Super User\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/person/fcd0f2cc-c27e-11e1-9262-a5fbf9edb8d2\",\"rel\":\"self\"}]},\"obs\":[],\"orders\":[],\"voided\":false,\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encounter/d9ec83e6-be4b-4622-8ee4-da64b7d8f54b\",\"rel\":\"self\"},{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encounter/d9ec83e6-be4b-4622-8ee4-da64b7d8f54b?v=full\",\"rel\":\"full\"}],\"resourceVersion\":\"1.8\"}",
                status: 201

            }
            request.success = 'true';
            request.callback(null, true, response);
            expect(request.jsonData.patient).toEqual("fcd0f543-c27e-11e1-9262-a5fbf9edb8d2");
        })
        var encounter = Ext.create('Screener.model.encounters',{
            patient : "fcd0f543-c27e-11e1-9262-a5fbf9edb8d2",
            encounterDatetime: "2012-06-30T11:54:52.000+0400",
			encounterType: "88929d98-a0f6-4874-b185-a11322ea7e95",
			location: "SCREENER - encountered when patient screened",
			provider: "fcd0f2cc-c27e-11e1-9262-a5fbf9edb8d2",
        });
        store = Ext.create('Screener.store.encounters')
        store.add(encounter);
        store.sync();
        expect(store.getAt(0).getData().patient.uuid).toEqual("fcd0f543-c27e-11e1-9262-a5fbf9edb8d2");
        expect(store.getAt(0).getData().provider.uuid).toEqual("fcd0f2cc-c27e-11e1-9262-a5fbf9edb8d2");
	}