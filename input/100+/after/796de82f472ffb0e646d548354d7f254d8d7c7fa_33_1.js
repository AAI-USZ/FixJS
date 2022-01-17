function() {
		spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"04e12695-4e25-406c-9044-342d5337280a\",\"display\":\"REGISTRATION 28/06/2012\",\"encounterDatetime\":\"2012-06-28T11:54:52.000+0400\",\"patient\":{\"uuid\":\"0f86b6a5-6dbe-46bc-ba30-4b0b234c460e\",\"display\":\"sdf xcv\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/person/0f86b6a5-6dbe-46bc-ba30-4b0b234c460e\",\"rel\":\"self\"}]},\"location\":null,\"form\":null,\"encounterType\":{\"uuid\":\"677c2593-a2ea-4029-a5ba-e261482c2077\",\"display\":\"REGISTRATION - New registration\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encountertype/677c2593-a2ea-4029-a5ba-e261482c2077\",\"rel\":\"self\"}]},\"provider\":{\"uuid\":\"13f2c8b2-c6a4-497f-af28-6a3f88e5cae3\",\"display\":\"User Who Is Admin\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/person/13f2c8b2-c6a4-497f-af28-6a3f88e5cae3\",\"rel\":\"self\"}]},\"obs\":[],\"orders\":[],\"voided\":false,\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encounter/04e12695-4e25-406c-9044-342d5337280a\",\"rel\":\"self\"},{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encounter/04e12695-4e25-406c-9044-342d5337280a?v=full\",\"rel\":\"full\"}],\"resourceVersion\":\"1.8\"}",
                status: 201

            }
            request.success = 'true';
            request.callback(null, true, response);
            expect(request.jsonData.patient).toEqual("0f86b6a5-6dbe-46bc-ba30-4b0b234c460e");
        })
        var encounter = Ext.create('Screener.model.encounters',{
            patient : "0f86b6a5-6dbe-46bc-ba30-4b0b234c460e",
            encounterDatetime: "2012-06-28T11:54:52.000+0400",
			encounterType: "677c2593-a2ea-4029-a5ba-e261482c2077",
			location: "Registration Desk:Screener",
			provider: "13f2c8b2-c6a4-497f-af28-6a3f88e5cae3",
        });
        store = Ext.create('Screener.store.encounters')
        store.add(encounter);
        store.sync();
        expect(store.getAt(0).getData().patient.uuid).toEqual("0f86b6a5-6dbe-46bc-ba30-4b0b234c460e");
        expect(store.getAt(0).getData().provider.uuid).toEqual("13f2c8b2-c6a4-497f-af28-6a3f88e5cae3");
	}