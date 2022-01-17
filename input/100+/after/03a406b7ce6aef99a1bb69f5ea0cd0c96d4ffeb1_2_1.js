function () {

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
    }