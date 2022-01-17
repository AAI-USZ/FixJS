function InitEWolf() {
		
	eWolf.mainApps.addMenuItem(eWolf.data("userID"),"My Profile");
	new Profile(eWolf.data("userID"),eWolf.data('userName'),eWolf.applicationFrame);
	
//	menuList.addMenuItem("news_feed","News Feed");
//	new NewsFeed("news_feed",applicationFrame);
	
	eWolf.mainApps.addMenuItem("messages","Messages");
	new Inbox("messages",eWolf.applicationFrame);
	
	new SearchApp("search",eWolf.sideMenu,eWolf.applicationFrame,
			$("#txtSearchBox"),$("#btnSearch"),$("#btnAdd"));
		
	//eWolf.trigger("select",["news_feed"]);
}