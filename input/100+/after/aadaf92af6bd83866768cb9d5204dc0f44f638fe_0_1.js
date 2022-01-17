function() {
	chrome.pageAction.setIcon({tabId: tabs[tabIndex].id, path: "active.png"});
	showTab(tabIndex);

	switch(direction) {
	case 'forward':
	    tabIndex ++;
	    if (tabIndex >= tabs.length) {
		tabIndex = 0;
	    }
	    break;
        case 'backward':
	    tabIndex --;
	    if (tabIndex < 0) {
		tabIndex = tabs.length-1;
	    }
	    break;
	case 'random':
	    var random = Math.floor(Math.random() * tabs.length);
	    if (tabIndex == random) {
		random = Math.floor(Math.random() * tabs.length);
	    }
	    tabIndex = random;
	    break;
	}
	
    }