function(tab) {
    // load settings
    interval = localStorage["interval"];
    direction = localStorage["direction"];
    startFromBeginning = localStorage['start_from_beginning'] == 'true';
    console.log("interval:"+interval+"\ndirection:"+direction+"\nstartFromBeginning:"+startFromBeginning);

    // create a new tab
    //var viewTabUrl = chrome.extension.getURL("test.html");
    //chrome.tabs.create({url: viewTabUrl});
    // show current tab
    tabIndex = tab.index;
    currentWindowId = tab.windowId;
    // show all tabs
    if (running) {
	clearInterval(myInterval);
	chrome.pageAction.setIcon({tabId: tab.id, path: "inactive.png"});
    } else {
	chrome.pageAction.setIcon({tabId: tab.id, path: "active.png"});

	doSwitch(startFromBeginning);
    }

    running = !running;
}