function(combo, records) {
		var view_id = records[0].get('id');
		log.debug('Set dashboard to ' + view_id, this.logAuthor);

		//set new dashboard
		this.getController('Account').setConfig('dashboard', view_id);

		var maintabs = Ext.getCmp('main-tabs');

		//close view selected if open
		var tab = Ext.getCmp(view_id + '.tab');
		if (tab)
			maintabs.remove(tab.id)

		//close current dashboard
		maintabs.remove(maintabs.getComponent(0).id)
		
		var tab = this.getController('Tabs').open_dashboard();
	}