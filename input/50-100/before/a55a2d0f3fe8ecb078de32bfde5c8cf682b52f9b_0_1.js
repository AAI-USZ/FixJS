function rNewTab(tabId, changeInfo, tab) 
{
	if (changeInfo.status == 'complete') 
	{
		//alert(tab.url);
	
		if (tab.url.split('oauth').length > 1)
		{
		    
		    var appName = tab.url.split('apps.facebook.com%2F')[1].split('%2F')[0];		    
		    var actions = tab.url.split('scope=').pop();
		    //alert(appName + " ; " + actions);
//            chrome.tabs.insertCSS(tabId, {file: "test.css"});
//            chrome.tabs.insertCSS(tabId, {file: "bootstrap.css"});
//            chrome.tabs.insertCSS(tabId, {file: "standardLabel.css"});
//		    chrome.tabs.executeScript(tabId, {file: "jquery-1.7.2.min.js"});
//            chrome.tabs.executeScript(tabId, {file: "popover.js"});
//            chrome.tabs.executeScript(tabId, {file: "dv.js"});
//		    chrome.tabs.executeScript(tabId, {file: "content_dv.js"});
		}
	}
	//alert('called ' + JSON.stringify(changeInfo) + JSON.stringify(tab));
}