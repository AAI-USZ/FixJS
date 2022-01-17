function () {

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
    }