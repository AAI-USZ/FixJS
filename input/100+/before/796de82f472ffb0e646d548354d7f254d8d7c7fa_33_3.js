function () {
        Ext.create('Screener.view.DoctorSummary')
        Ext.create('Screener.view.PatientView')
        var list = Ext.getCmp('doctorList')
        var pList = Ext.getCmp('assignedPatientList')
        runs(function () {
            var dStore = Ext.create('Screener.store.Doctors')
            var store = ctlr.countPatients();
            Ext.getCmp('doctorList').setStore(store)
            var pStore = null;
            pStore = ctlr.getAssignedPatientList(list, 0, null)
            this.currentPatientIndex = ctlr.expandAssignedPatient(pList, 0, null, null)
        });
        waits(5000);
        runs(function () {
            expect(pStore.getData().getCount()).toEqual(Ext.getCmp('doctorList').getStore().getData().items[0].data.numpatients)
            Ext.getCmp('assignedPatientList').setStore(pStore)
            spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
                if (request.method == 'DELETE') {
                    expect(request.url).toEqual(HOST + '/ws/rest/v1/encounter/' + pStore.getData().items[0].getData().encuuid + '?!purge');
                }
            })
            var uuid = ctlr.removePatient()
        });
    }