function ContactWindow(navGroup) 
{		
	//load dependencies
	var ListView = require('ui/common/about/contact/ListView');
	
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