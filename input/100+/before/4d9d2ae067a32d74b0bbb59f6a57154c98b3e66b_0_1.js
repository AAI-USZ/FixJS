function () {
        var d = new Date();
        var list_regEncounter = Ext.create('Screener.model.PostList', {
            name: "Registration Encounter",
            description: "Patients encountered Registration" + "startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d),
            searchQuery: "?encounterType=" + localStorage.regUuidencountertype + "&startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d)
        });
        var list_scrEncounter = Ext.create('Screener.model.PostList', {
            name: "Screener Encounter",
            description: "Patients encountered Screener on " + "startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d),
            searchQuery: "?encounterType=" + localStorage.screenerUuidencountertype + "&startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d)

        });
        var list_outEncounter = Ext.create('Screener.model.PostList', {
            name: "Outpatient Encounter",
            description: "Patients encountered Outpatient on " + "startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d),
            searchQuery: "?encounterType=" + localStorage.outUuidencountertype + "&startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d)

        });
        console.log(list_outEncounter)
        //this.createRegList(list_regEncounter, list_scrEncounter);
        var k = 0;
        this.createList(list_regEncounter, list_scrEncounter, list_outEncounter, k);

    }