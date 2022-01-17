function () {
        var d = new Date();
        var list_regEncounter = Ext.create('Screener.model.PostList', {
            name: "Registration Encounter",
            description: "Patients encountered Registration" + "startDate=" + Util.Datetime(d,24) + "&endDate=" + Util.Datetime(d,-24),
            searchQuery: "?encounterType=" + localStorage.regUuidencountertype + "&startDate=" + Util.Datetime(d,24) + "&endDate=" + Util.Datetime(d,-24)
        });
        var list_scrEncounter = Ext.create('Screener.model.PostList', {
            name: "Screener Encounter",
            description: "Patients encountered Screener on " + "startDate=" + Util.Datetime(d,24) + "&endDate=" + Util.Datetime(d,-24),
            searchQuery: "?encounterType=" + localStorage.screenerUuidencountertype + "&startDate=" + Util.Datetime(d,24) + "&endDate=" + Util.Datetime(d,-24)
        });
        var store_patientList = Ext.create('Screener.store.PatientList', {
            storeId: 'patientStore'
        });
        
		//this.createRegList(list_regEncounter, list_scrEncounter);
		var k = 0;
		this.createList(list_regEncounter, list_scrEncounter, k);
		
    }