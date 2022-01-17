function () {
            expect(pStore.getData().getCount()).toEqual(Ext.getCmp('doctorList').getStore().getData().items[0].data.numpatients)
            Ext.getCmp('assignedPatientList').setStore(pStore)
            spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
                if (request.method == 'DELETE') {
                    expect(request.url).toEqual(HOST + '/ws/rest/v1/encounter/' + pStore.getData().items[0].getData().encuuid + '?!purge');
                }
            })
            var uuid = ctlr.removePatient()
        }