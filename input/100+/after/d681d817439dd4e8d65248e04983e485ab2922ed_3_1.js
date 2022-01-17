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
	
	var homeButton = Ti.UI.createButton({
		title: 'Home'
	});
	self.leftNavButton = homeButton;
	
	//homeButton.addEventListener('click', function(){
	//	navGroup.close(self.tabGroup);
	//});
	
	homeButton.addEventListener('click', function(){
		Ti.App.fireEvent('closeAbout');
	});
	
	function removeIt(){
		self.remove(listView);
		listView = null;
		self.leftNavButton = null;
		homeButton = null;
	};
	
	Ti.App.addEventListener('closeAbout', removeIt);
	
	self.addEventListener('close', function(){
		Ti.App.removeEventListener('closeAbout', removeIt);
		alert('Close');
	});
	
	return self;
}