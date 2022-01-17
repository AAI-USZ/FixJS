function createMainApps() {
		
	eWolf.mainApps.addMenuItem(eWolf.data("userID"),"My Profile");
	new Profile(eWolf.data("userID"),eWolf.data('userName'),eWolf.applicationFrame);
	
	eWolf.mainApps.addMenuItem("__pack__wall-readers","News Feed");
	
	eWolf.mainApps.addMenuItem("messages","Messages");
	new Inbox("messages",eWolf.applicationFrame);
	
	new SearchApp("search",eWolf.sideMenu,eWolf.applicationFrame,
			$("#txtSearchBox"),$("#btnSearch"),$("#btnAdd"));
}