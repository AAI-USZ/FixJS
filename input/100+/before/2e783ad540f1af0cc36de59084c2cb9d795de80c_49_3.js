function () {

    var store = null;
    var ctlr = null;
    var view = null;


    beforeEach(function () {
        if (!ctlr) {
            ctlr = App.getController('Application');
        }
        if (!view) {
            view = Ext.create('Screener.view.NewPatient');

            //mocking ajax call with Jasmine Spies
            Ext.getCmp("givenName").setValue('Raxa');
            Ext.getCmp("familyName").setValue('Jss');
            Ext.getCmp('ext-radiofield-1').check();
        }
        if (!store) {
            store = Ext.create('Screener.store.NewPersons');
        }
    });

    it("data in the form fields and responce from ajax request loads in store", function () {

        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\": \"a1b066a7-53de-4d35-914f-765b3c782855\",\"display\":\"Raxa Jss\",\"gender\":\"M\",\"age\":null,\"birthdate\":null,\"birthdateEstimated\":false,\"dead\":false,\"deathDate\":null,\"causeOfDeath\":null,\"preferredName\":{\"uuid\":\"c9ad4ece-9b3b-4b4c-aad0-ad1b80624cb4\",\"display\":\"Raxa Jss\",\"links\":[{\"uri\":\"NEED-TO-CONFIGURE/ws/rest/v1/person/a1b066a7-53de-4d35-914f-765b3c782855/name/c9ad4ece-9b3b-4b4c-aad0-ad1b80624cb4\",\"rel\":\"self\"}]},\"preferredAddress\":null,\"attributes\":[],\"voided\": false,\"links\":[{\"uri\":\"NEED-TO-CONFIGURE/ws/rest/v1/person/a1b066a7-53de-4d35-914f-765b3c782855\",\"rel\":\"self\"},{\"uri\":\"NEED-TO-CONFIGURE/ws/rest/v1/person/a1b066a7-53de-4d35-914f-765b3c782855?v=full\",\"rel\":\"full\"}]}",
                status: 201
            }
            request.success = 'true';
            request.callback(null, true, response);
        })
        store = ctlr.savePerson();
        expect(store.getAt(0).getData().uuid).toEqual("a1b066a7-53de-4d35-914f-765b3c782855");

    });

    it("loads patientIdentifiersTypes in store", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":[{\"uuid\":\"8d79403a-c2cc-11de-8d13-0010c6dffd0f\",\"display\":\"Old Identification Number - Number given out prior to the OpenMRS system (No check digit)\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/patientidentifiertype/8d79403a-c2cc-11de-8d13-0010c6dffd0f\",\"rel\":\"self\"}]},{\"uuid\":\"8d793bee-c2cc-11de-8d13-0010c6dffd0f\",\"display\":\"OpenMRS Identification Number - Unique number used in OpenMRS\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/patientidentifiertype/8d793bee-c2cc-11de-8d13-0010c6dffd0f\",\"rel\":\"self\"}]}]}",
                status: 200
            }
            request.success = 'true';
            request.callback(null, true, response)
        })
        store = Ext.create('Screener.store.IdentifierType');
        store.load();
        expect(store.getAt(0).getData().uuid).toEqual("8d79403a-c2cc-11de-8d13-0010c6dffd0f")
    });

    it("loads patientIdentifiersTypes in store", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":[{\"uuid\":\"8d6c993e-c2cc-11de-8d13-0010c6dffd0f\",\"display\":\"Unknown Location - \",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v2/location/8d6c993e-c2cc-11de-8d13-0010c6dffd0f\",\"rel\":\"self\"}]}]}",
                status: 200
            }
            request.success = 'true';
            request.callback(null, true, response)
        })
        store = Ext.create('Screener.store.Location');
        store.load();
        expect(store.getAt(0).getData().uuid).toEqual("8d6c993e-c2cc-11de-8d13-0010c6dffd0f")
    });
    it("responce from ajax request loads in store", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"8896cd8c-e910-44df-96cd-37ce894fd6e3\",\"display\":\"Raxa Jss\",\"gender\":\"M\",\"age\":20,\"birthdate\":null,\"birthdateEstimated\":false,\"dead\":false,\"deathDate\":null,\"causeOfDeath\":null,\"preferredName\":{\"uuid\":\"31913fd2-2f83-48ab-83ad-12a587fe3744\",\"display\":\"Raxa Jss\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3/name/31913fd2-2f83-48ab-83ad-12a587fe3744\",\"rel\":\"self\"}]},\"preferredAddress\":{\"uuid\":\"675dd755-1a5c-41db-b9b0-548d80c4fab2\",\"display\":\"12\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3/address/675dd755-1a5c-41db-b9b0-548d80c4fab2\",\"rel\":\"self\"}]},\"attributes\":[],\"voided\":false,\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3\",\"rel\":\"self\"},{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3?v=full\",\"rel\":\"full\"}]}",
                status: 201

            }
            request.success = 'true';
            request.callback(null, true, response);
        })
        var patient = Ext.create('Screener.model.NewPatient', {
            person: "8896cd8c-e910-44df-96cd-37ce894fd6e3",
            identifiers: [{
                identifier: Util.getPatientIdentifier().toString(),
                identifierType: "8d79403a-c2cc-11de-8d13-0010c6dffd0f",
                location: "8d6c993e-c2cc-11de-8d13-0010c6dffd0f",
                preferred: true
            }]
        });
        store = Ext.create('Screener.store.Patients')
        store.add(patient);
        store.sync();
        expect(store.getAt(0).getData().person).toEqual("8896cd8c-e910-44df-96cd-37ce894fd6e3");
        expect(store.getAt(0).getData().identifiers[0].location).toEqual("8d6c993e-c2cc-11de-8d13-0010c6dffd0f");
    });
	it("saves encounter of registration of a patient on the server", function() {
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
	});
	it("saves encounter of waiting patient on the server", function() {
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
	});
}