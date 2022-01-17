function() {
        this.module = "Calendar2";
        this.loadFunctions(this.module);
        dojo.subscribe(this.module + ".showFormFromList", this, "showFormFromList");
        dojo.subscribe(this.module + ".dayViewClick", this, "dayViewClick");
        dojo.subscribe(this.module + ".weekViewClick", this, "weekViewClick");
        dojo.subscribe(this.module + ".monthViewClick", this, "monthViewClick");
        dojo.subscribe(this.module + ".caldavViewClick", this, "caldavViewClick");
        dojo.subscribe(this.module + ".setDate", this, "setDate");
        dojo.subscribe(this.module + ".userSelectionClick", this, "userSelectionClick");
        dojo.subscribe(this.module + ".anotherViewDayClick", this, "anotherViewDayClick");
        dojo.subscribe(this.module + ".loadAppropriateList", this, "loadAppropriateList");
        dojo.subscribe(this.module + ".connectMouseScroll", this, "connectMouseScroll");
        dojo.subscribe(this.module + ".scrollDone", this, "scrollDone");
        dojo.subscribe(this.module + ".connectViewResize", this, "connectViewResize");
        dojo.subscribe(this.module + ".saveChanges", this, "saveChanges");
        dojo.subscribe(this.module + ".enableEventDivClick", this, "enableEventDivClick");
        dojo.subscribe(this.module + ".proxyChanged", this, "_changeProxyUser");
        dojo.subscribe(this.module + ".proxyLoad", this, "_loadProxyableUsers");

        this.gridWidget = phpr.Calendar2.Grid;
        this.dayListSelfWidget = phpr.Calendar2.ViewDayListSelf;
        this.dayListSelectWidget = phpr.Calendar2.ViewDayListSelect;
        this.weekListWidget = phpr.Calendar2.ViewWeekList;
        this.monthListWidget = phpr.Calendar2.ViewMonthList;
        this.caldavViewWidget = phpr.Calendar2.ViewCaldav;
        this.formWidget = phpr.Calendar2.Form;
        this.userStore = new phpr.Default.System.Store.User();

        this.setActiveUser(null);
    }