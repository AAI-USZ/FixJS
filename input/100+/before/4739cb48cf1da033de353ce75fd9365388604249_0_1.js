function AppWindow(navGroup) 
{		
	//load dependencies
	var ListView = require('ui/common/about/app/ListView');
	
	//Create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		title: 'App Overview',
		navBarHidden: false
	})
	
	var listView = new ListView();	
	
	self.add(listView);
	
	return self;
}