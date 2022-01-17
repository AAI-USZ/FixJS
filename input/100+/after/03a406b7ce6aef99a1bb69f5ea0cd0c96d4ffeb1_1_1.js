function () {
        var d = new Date();
        var list_regEncounter = Ext.create('Screener.model.PostList', {
            name: "Registration Encounter",
            description: "Patients encountered Registration" + "startDate=" + Util.startDatetime(d) + "&endDate=" + Util.Datetime(d),
            searchQuery: "?encounterType=" + localStorage.regUuidencountertype + "&startDate=" + Util.startDatetime(d) + "&endDate=" + Util.Datetime(d)
        });
        var list_scrEncounter = Ext.create('Screener.model.PostList', {
            name: "Screener Encounter",
            description: "Patients encountered Screener on " + "startDate=" + Util.startDatetime(d) + "&endDate=" + Util.Datetime(d),
            searchQuery: "?encounterType=" + localStorage.screenerUuidencountertype + "&startDate=" + Util.startDatetime(d) + "&endDate=" + Util.Datetime(d)
        });
        //this.createRegList(list_regEncounter, list_scrEncounter);
		var k = 0;
		this.createList(list_regEncounter, list_scrEncounter, k);
		
    }