function () {
    var regList = null;
    var scrList = null;
    var mainList = null;
    var ctrl = null;
    var d = new Date();


    beforeEach(function () {
        if (!ctrl) {
            ctrl = App.getController('Application');
        }
        if (!regList) {
            regList = Ext.create('Screener.store.PostLists');
        }
        if (!scrList) {
            scrList = Ext.create('Screener.store.PostLists');
        }


    });

    it("Posts Regisration abd Screener Lists", function () {

        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"02b2235a-c209-4000-b4b0-25e0223eaa80\",\"name\":\"Registration Encounter\",\"description\":\"Patients encountered RegistrationstartDate=2012-07-05T09:54:44Z&endDate=2012-07-06T09:54:44Z\"}",
                status: 201
            }
            request.success = 'true';
            request.callback(null, true, response);
        })
        var list_regEncounter = Ext.create('Screener.model.PostList', {
            name: "Testing Registration Encounter",
            description: "Patients encountered RegistrationstartDate=2012-07-05T09:54:44Z&endDate=2012-07-06T09:54:44Z",
            searchQuery: "?encounterType=3d1c19eb-f228-4605-906f-ed80f4a0f63f&startDate=2012-07-05T09:54:44Z&endDate=2012-07-06T09:54:44Z"
        });
        var list_scrEncounter = Ext.create('Screener.model.PostList', {
            name: "Testing Registration Encounter",
            description: "Patients encountered ScreenerstartDate=2012-07-05T09:54:44Z&endDate=2012-07-06T09:54:44Z",
            searchQuery: "?encounterType=f9591030-b8cb-4b30-9cc3-3f059494594e&startDate=2012-07-05T09:54:44Z&endDate=2012-07-06T09:54:44Z"
        });
		var k = 0;
        Lists = ctrl.createList(list_regEncounter, list_scrEncounter, k);
        expect(Lists[0].getData().getAt(0).getData().uuid).toEqual('02b2235a-c209-4000-b4b0-25e0223eaa80');
		expect(Lists[1].getData().getAt(0).getData().uuid).toEqual('02b2235a-c209-4000-b4b0-25e0223eaa80');
    });

    
    it(" Gets patient List", function () {

        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"patients\":[{\"uuid\":\"969ba9a4-f53d-451f-ab97-0fa8b3e94523\",\"display\":\"Alpha d Beta\",\"gender\":\"M\",\"age\":null,\"encounters\":[{\"uuid\":\"a70e09b5-634b-4f8c-922f-7f9e511fe56b\",\"display\":\"REGISTRATION - 2012-07-05 15:14:00.0\",\"encounterType\":\"3d1c19eb-f228-4605-906f-ed80f4a0f63f\",\"encounterDatetime\":\"2012-07-05T15:14:00.000+0530\",\"provider\":\"68fc795e-50bd-424a-8e4e-7ca426c04953\",\"obs\":[]}]}]}",
                status: 201
            }
            request.success = 'true';
            request.callback(null, true, response);
        })
		patientList = ctrl.finalPatientList(Lists[0], Lists[1]);
        expect(patientList.getData().getAt(0).getData().display).toEqual("Alpha d Beta");
        var link = patientList.getProxy().getUrl();
        var inList = link.indexOf(Lists[0].getData().getAt(0).getData().uuid);
        var notInList = link.indexOf(Lists[1].getData().getAt(0).getData().uuid);
        expect(inList).toNotEqual(-1);
        expect(notInList).toNotEqual(-1);
    });
}