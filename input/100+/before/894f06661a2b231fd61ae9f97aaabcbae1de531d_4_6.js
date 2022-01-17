function (btn) {
            if (btn == 'yes') {
                for (i = 0; i < Ext.getCmp('assignedPatientList').getStore().getCount(); i++) {
                    var uuid = Ext.getCmp('assignedPatientList').getStore().getAt(i).getData().encuuid
                    Ext.Ajax.request({
                        url: HOST + '/ws/rest/v1/encounter/' + uuid + '?!purge',
                        withCredentials: true,
                        useDefaultXhrHeader: false,
                        method: 'DELETE',
                        headers: Util.getBasicAuthHeaders()
                    });
                }
                objectRef.showPatients()
            } else {}
        }