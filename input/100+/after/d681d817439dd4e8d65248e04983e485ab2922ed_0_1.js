function removeAll(){
		// remove all tabs
		self.removeTab(appTab);
		self.removeTab(conferenceTab);
		self.removeTab(contactTab);
		self.removeTab(ullTab);
		
		navGroup.close(self);

		// empty out proxy properties
		appWindow.parentTab = null;
		conferenceWindow.parentTab = null;
		contactWindow.parentTab = null;
		ullWindow.parentTab = null;
		
		appTab.window = null;
		conferenceTab.window = null;
		contactTab.window = null;
		ullTab.window = null;
				
		// null out tabs	
		appTab = null;
		conferenceTab = null;
		contactTab = null;
		ullTab = null;
		
		// null out windows
		appWindow = null;
		conferenceWindow = null;
		contactWindow = null;
		ullWindow = null;
	}