function TabGroup(navGroup) // changed from 'AboutWindow' to 'TabGroup'
{
	var AppWindow = require('ui/common/about/app/AppWindow'),
		ConferenceWindow = require('ui/common/about/conference/ConferenceWindow'),
		ContactWindow = require('ui/common/about/contact/ContactWindow'),
		UllWindow = require('ui/common/about/ull/UllWindow');
		
	var appWindow = new AppWindow(navGroup),
		conferenceWindow = new ConferenceWindow(navGroup),
		contactWindow = new ContactWindow(navGroup),
		ullWindow = new UllWindow(navGroup);
		
	var self = Ti.UI.createTabGroup();
	
	var appTab = Ti.UI.createTab({
		title: 'App',
		icon: 'KS_nav_ui.png',
		window: appWindow
	});
	appWindow.parentTab = appTab;
	
	var conferenceTab = Ti.UI.createTab({
		title: 'Conference',
		icon: 'KS_nav_ui.png',
		window: conferenceWindow
	});
	conferenceWindow.parentTab = conferenceTab;
	
	var contactTab = Ti.UI.createTab({
		title: 'Contacts',
		icon: 'KS_nav_ui.png',
		window: contactWindow
	});
	contactWindow.parentTab = contactTab;
	
	var ullTab = Ti.UI.createTab({
		title: 'UL @ Lafayette',
		icon: 'KS_nav_ui.png',
		window: ullWindow
	});
	UllWindow.parentTab = ullTab;
	
	self.addTab(appTab);
	self.addTab(conferenceTab);
	self.addTab(contactTab);
	self.addTab(ullTab);
	
	return self;
}