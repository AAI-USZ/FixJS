function () {
		
		this.passwordChangePanel = Ext.create("PartKeepr.UserPasswordChangePanel");
		this.tipsPanel = Ext.create("PartKeepr.TipOfTheDayPreferencesPanel");
		this.formattingPanel = Ext.create("PartKeepr.FormattingPreferencesPanel");
		this.displayPreferencesPanel = Ext.create("PartKeepr.DisplayPreferencesPanel");
		this.stockPanel = Ext.create("PartKeepr.StockPreferencesPanel");
		this.items = [ this.tipsPanel, this.formattingPanel, this.displayPreferencesPanel, this.passwordChangePanel, this.stockPanel ];
		this.callParent();
	}