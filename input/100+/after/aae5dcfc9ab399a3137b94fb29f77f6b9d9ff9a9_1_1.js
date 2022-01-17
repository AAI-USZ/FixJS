function() {
	var tabGroup = Titanium.UI.createTabGroup();

	Titanium.UI.setBackgroundColor('#fff');  
	var tabGroup = Titanium.UI.createTabGroup();  

	//First start 
	var win_start = Titanium.UI.createWindow({  
    	title:'Bienvenue sur EasyWalk',
    	backgroundColor:'#007236',
    	url:'ui/common/win_start.js',
    	barColor: '#007236'
	});
	
	var win_history = Titanium.UI.createWindow({  
    	title:'Mes traces',
    	backgroundColor:'#007236',
    	url:'ui/common/win_history.js',
    	barColor: '#007236'  
	});	
	
	var win_downloads = Titanium.UI.createWindow({  
    	title:'Mes circuits',
    	backgroundColor:'#007236',
    	url:'ui/common/win_downloads.js',
    	barColor: '#007236'  
	});
	
	var tab_start = Titanium.UI.createTab({  
	    title:"Start",  
	    icon:Ti.UI.iPhone.SystemIcon.FEATURED,
	    window:win_start  
	});    
	
	var tab_history = Titanium.UI.createTab({  
	    title:"History",  
	    icon:Ti.UI.iPhone.SystemIcon.HISTORY,
	    window:win_history
	});
	
	var tab_downloads = Titanium.UI.createTab({  
	    title:"Downloads",  
	    icon:Ti.UI.iPhone.SystemIcon.DOWNLOADS,
	    window:win_downloads
	});

	//Hide TabBar
	//win_welcome.hideTabBar();  
	tabGroup.addTab(tab_start); 
	tabGroup.addTab(tab_history);  
	tabGroup.addTab(tab_downloads); 
	tabGroup.open();
	
}