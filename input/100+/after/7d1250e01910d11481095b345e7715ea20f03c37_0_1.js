function TabGroup(){
	var MapsWindow = require('ui/common/maps/campusMap/MapsWindow'),
		FloorPlansWindow = require('ui/common/maps/floorPlans/floorPlansWindow'),
		SearchWindow = require('ui/common/maps/search/SearchWindow');
	
	var mapsWindow = new MapsWindow(),
	    floorPlansWindow = new FloorPlansWindow(),
		searchWindow = new SearchWindow();

	var self = Ti.UI.createTabGroup();
	
	var mapsTab = Ti.UI.createTab({
		title: 'Campus Map',
		icon: 'KS_nav_ui.png',
		window: mapsWindow
	});
	mapsWindow.parentTab = mapsTab;
	
	var floorPlansTab = Ti.UI.createTab({
		title: 'Floor Plans',
		icon: 'KS_nav_views.png',
		window: floorPlansWindow
	});
	floorPlansWindow.parentTab = floorPlansTab;
	
	var searchTab = Ti.UI.createTab({
		title: 'Search',
		icon: 'KS_nav_views.png',
		window: searchWindow
	});
	searchWindow.parentTab = searchTab;	
	
	self.addTab(mapsTab);
	self.addTab(floorPlansTab);
	self.addTab(searchTab);
	
	Ti.App.addEventListener('annotationSelected', function(e){
		self.setActiveTab(mapsTab);
	});
	
	self.addEventListener('close', function(){
		Ti.App.removeEventListener('annotationSelected', function(e){
			self.setActiveTab(mapsTab);
		});
	});
		
	return self;
}