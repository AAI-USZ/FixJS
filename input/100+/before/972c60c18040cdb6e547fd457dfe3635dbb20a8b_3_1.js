function () {
    	this.createGlobalStores();
    	
    	if (window.parameters.userPreferences) {
    		PartKeepr.getApplication().setInitialUserPreferences(window.parameters.userPreferences);
    	}
    	
    	if (PartKeepr.initialUserPreferences) {
    		var records = this.getUserPreferenceStore().getProxy().getReader().read(PartKeepr.initialUserPreferences);
        	this.getUserPreferenceStore().loadRecords(records.records);	
    	}
    	
    	this.reloadStores();
		
		this.partManager = Ext.create("PartKeepr.PartManager", {
			title: i18n("Part Manager"),
			iconCls: 'icon-brick',
			closable: false
		});
		
		this.addItem(this.partManager);
		this.menuBar.enable();
		
		this.doSystemStatusCheck();
		this.doUnacknowledgedNoticesCheck();
		
		/* Give the user preference stuff enough time to load */
		/* @todo Load user preferences directly on login and not via delayed task */
		this.displayTipWindowTask = new Ext.util.DelayedTask(this.displayTipOfTheDayWindow, this);
		this.displayTipWindowTask.delay(100);
		
		this.setSession(this.getSessionManager().getSession());
		
		this.getStatusbar().getConnectionButton().setConnected();
		
    }