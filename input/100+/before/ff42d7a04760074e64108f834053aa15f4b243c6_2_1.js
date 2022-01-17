function HomeWindow() {
	//load component dependencies
	var MainView = require('ui/common/MainView'), navGroup = undefined;
	
	// constants
	var iconHeight = 50, iconWidth = 90, iconTop = 10, iconLeft = 10,
		tabColor = 'white', tabHeight = 70, tabWidth = 160;
		
	//create component instance
	var self = Ti.UI.createWindow();
	var mainNavWindow = Ti.UI.createWindow({
		backgroundImage:'images/main.png',
		title: 'Home',
		navBarHidden: true
	});

	// Announcements view
	var db = Titanium.Database.install('db/r3.sqlite','r3.sqlite');
    var resultSet = db.execute('SELECT * FROM announcements ORDER BY id DESC LIMIT 1');
	
	var announcementRow = Ti.UI.createTableViewRow({
		backgroundColor: 'transparent',
		hasChild: true,
		height: 72
	});
	
	var header = Ti.UI.createLabel({
		text: 'Announcements',
		color: '#7C0606',
		font: {fontSize: 24, fontWeight: 'bold'},
		top: 10,
		left: 10,
		height: 25
	});
	var subtitle = Ti.UI.createLabel({
		text: 'LATEST: ' + resultSet.fieldByName('announcement'),
		color: '#6A737D',
		font: {fontSize: 12},
		top: 25,
		left: 10,
		height: 25
	});
	announcementRow.add(header);
	announcementRow.add(subtitle);
	
	var announcements = Ti.UI.createTableView({
		backgroundColor: 'transparent',
		separatorColor: 'transparent',
		top: 145,
		height: 72,
		className: 'announcements'
	});
	announcements.appendRow(announcementRow);
	
	announcements.addEventListener('click', function(){
		var AnnouncementsWindow = require('ui/common/announcements/AnnouncementsWindow');
		var announcementsWindow = new AnnouncementsWindow(navGroup);
		navGroup.open(announcementsWindow, {animated:true});
	});

	/*---- Icon Views ----*/
	var eventIcons = Ti.UI.createView({
		backgroundImage: 'NONE',
		top: 0,
		height: 150,
		layout: 'horizontal'
	});
	
	var resourceIcons = Ti.UI.createView({
		backgroundImage: 'NONE',
		top: 0,
		height: 150,
		layout: 'horizontal'
	});	

	/*---- Home Icons ----*/
	var collegesButton = Ti.UI.createButton({
		title: "Colleges",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	eventIcons.add(collegesButton);
	
	var schedulesButton = Ti.UI.createButton({
		title: "Schedule",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	eventIcons.add(schedulesButton);
	
	var mapsButton = Ti.UI.createButton({
		title: "Maps",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	eventIcons.add(mapsButton);
	
	var presentationsButton = Ti.UI.createButton({
		title: "Sessions",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	eventIcons.add(presentationsButton);
	
	var competitionsButton = Ti.UI.createButton({
		title: "Competitions",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	eventIcons.add(competitionsButton);
	
	var certificationsButton = Ti.UI.createButton({
		title: "Certifications",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	eventIcons.add(certificationsButton);
	
	var photosButton = Ti.UI.createButton({
		title: "Photos",
		height: iconHeight,
		width: iconWidth,
		top: iconTop,
		left: iconLeft
	});
	resourceIcons.add(photosButton);
	
	/*---- Icon EventListeners ----*/
	collegesButton.addEventListener('click', function(e){
		var CollegesWindow = require('ui/common/colleges/CollegesWindow');
		var collegesWindow = new CollegesWindow(navGroup);
		navGroup.open(collegesWindow, {animated:true});
	});
	
	schedulesButton.addEventListener('click', function(e){
		var SchedulesWindow = require('ui/common/schedules/SchedulesWindow');
		var schedulesWindow = new SchedulesWindow(navGroup);
		navGroup.open(schedulesWindow, {animated:true});
	});
	
	mapsButton.addEventListener('click', function(e){
		var MapsWindow = require('ui/common/maps/MapsWindow');
		var mapsWindow = new MapsWindow();
		navGroup.open(mapsWindow, {animated:true});
	});
	
	presentationsButton.addEventListener('click', function(e){
		var TabGroup = require('ui/common/presentations/TabGroup');
		var tabGroup = new TabGroup(navGroup);
		navGroup.open(tabGroup);
	});
	
	competitionsButton.addEventListener('click', function(e){
		var CompetitionsWindow = require('ui/common/competitions/CompetitionsWindow');
		var competitionsWindow = new CompetitionsWindow(navGroup);
		navGroup.open(competitionsWindow);
	});	
	certificationsButton.addEventListener('click', function(e){
		var CertificationsWindow = require('ui/common/certifications/CertificationsWindow');
		var certificationsWindow = new CertificationsWindow(navGroup);
		navGroup.open(certificationsWindow);
	});
	photosButton.addEventListener('click', function(e){
		var PhotosWindow = require('ui/common/photos/PhotosWindow');
		var photosWindow = new PhotosWindow();
		navGroup.open(photosWindow, {animated:true});
	});
    	
    	// tabs
	var eventsTab = Ti.UI.createButton({
		backgroundImage: 'NONE',
		color: tabColor,
		title: 'Events',
		bottom: 0,
		left: 0,
		height: tabHeight,
		width: tabWidth
	});
	mainNavWindow.add(eventsTab);
	
	var resourcesTab = Ti.UI.createButton({
		backgroundImage: 'NONE',
		color: tabColor,
		title: 'Resources',
		bottom: 0,
		right: 0,
		height: 70,
		height: tabHeight,
		width: tabWidth
	});
	mainNavWindow.add(resourcesTab);
	
	var scrollableView = Ti.UI.createScrollableView({
	  views:[eventIcons,resourceIcons],
	  showPagingControl: true,
	  pagingControlColor: '#E5EAEF',
	  bottom: 70,
	  height: 150
	});
	
	// tab event listeners
	eventsTab.addEventListener('click', function(){
		scrollableView.scrollToView(eventIcons);
	});
	
	resourcesTab.addEventListener('click', function(){
		scrollableView.scrollToView(resourceIcons);
	});
	
	mainNavWindow.add(scrollableView);
    mainNavWindow.add(announcements);
    
    // handle cross-platform navigation
    if (Ti.Platform.osname == 'android') {
        navGroup = {
            open: function (win, obj) {
                win.open(obj);
            },
            close: function (win, obj) {
                win.close(obj);
            }
        };
        self = mainNavWindow;
        self.exitOnClose = true;
        mainNavWindow = null;
    } else {
		navGroup = Ti.UI.iPhone.createNavigationGroup({
			window: mainNavWindow
		});
		self.add(navGroup);
    }

	return self;

}