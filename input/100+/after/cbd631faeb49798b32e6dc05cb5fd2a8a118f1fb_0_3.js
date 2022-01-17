function(){
	var initialized = false;
	var timer_on = false;
	var POLLING_FREQUENCY = 4000;
	var MAX_UNSEEN = 100;
	var xhr = new XMLHttpRequest();
	var last_n_count = 0;
	var last_m_count = 0;
	var last_unseen = [];
	var first_response = true;
	
	if(!initialized)
	{
		console.log("<quorum> initializing background page");
		initialized = true;
		timer_on = true;
		var timer = setTimeout(fetchData, POLLING_FREQUENCY);
		console.log("<quorum> Background page initialized successfully");
	} 


	function fetchData()
	{
		if(timer_on)
		{
			// fetch data 
			request("http://api.quora.com/api/logged_in_user?fields=inbox,notifs");
			//request("synthetic.json");
			setTimeout(fetchData, POLLING_FREQUENCY)
		}
	}


	function request(url)
	{
		
		try
		{
			xhr.onreadystatechange = processResponse;
			
			xhr.onerror = function(error)
			{
				console.debug("<quorum> [error] " + error);
			}
			
			var bustCache;
			
			if(url.indexOf("?") == -1)
			{
				
				bustCache = "?bustCache=" + Math.random();
			}
			else
			{
				bustCache = "&bustCache=" + Math.random();
			}

			url += bustCache;
			xhr.open("GET", url, false); 
			xhr.send(null);
		}
		catch(e)
		{
			console.error("<quorum> [error] " + error);
		}
	}

	/* update pop */
	function processResponse()
	{

		if(xhr.readyState!=4)
			return;
		
		if(xhr.responseText)
		{
			var response = xhr.responseText;
			var badgeText = "";

			json = JSON.parse(response.substring("while(1);".length));

			var inbox = json.inbox;
			var link = json.link;
			var notifs = json.notifs;

			if(inbox == undefined || link == undefined)
			{
				console.log("<quorum> [error] Invalid JSON");
				return;	
			}
			
			var n_count = notifs.unseen_count;
			var m_count = inbox.unread_count;
			var n_unseen = notifs.unseen;
			var m_unseen = inbox.unseen;

			var toast_cnt = 0;

			// Dynamically adjust the buffer max. 
			// If n_unseen.length > MAX_UNSEEN, it will lead
			// to rapid changes in last_unseen on every call. 

			if(n_unseen.length > MAX_UNSEEN)
			{
				MAX_UNSEEN = n_unseen.length;
			}

			if(n_count > 0)
			{
				if(!first_response)
				{
					for(var i=0; i<n_unseen.length; ++i)	
					{
						if(toast_cnt < 5 && last_unseen.indexOf(n_unseen[i]) == -1)
						{
							++toast_cnt;
							showToast(n_unseen[i]);
							addToUnseen(n_unseen[i])
						}
					}
				}			
				else
				{
					for(var i=0; i<n_unseen.length; ++i)
					{
						addToUnseen(n_unseen[i]);
					}
				}

			}	


			var txt = "";

			if(n_count > 0)
			{
				txt = String(n_count);
			}

			if(m_count > 0)
			{
				txt = String(n_count) + "/" + String(m_count);
			}

			badgeText = (txt.length > 4 ? "---" : txt);
		
			last_n_count = n_count;
			last_m_count = m_count;
			chrome.browserAction.setBadgeText({text: badgeText});
			first_response = false;
		}
		else
		{
			console.log("<quorum> [error] Empty response received from Quora");
		}
	}

	function addToUnseen(item)
	{
		if(last_unseen.length == MAX_UNSEEN)
		{
			last_unseen.shift();
		}

		last_unseen.push(item);
	}

	function showToast(body)
	{
		var notification = window.webkitNotifications.createHTMLNotification(formURL(body));
		notification.show();

		notification.onclick = function()  { window.open("http://www.quora.com/notifications"); }
		setTimeout(function(){ notification.cancel(); }, 8000);
	}
	
	
	function formURL(item)
	{
		var queryString = "body" + "=" + encodeURIComponent(item);
		noticeURL = chrome.extension.getURL('notification.html') + "?" + queryString;
		return noticeURL;
	}

	// Send message to popup
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
		if(request["notifs"])
		{
			sendResponse({'notifs':last_unseen,'n_count':last_n_count,'m_count':last_m_count});
		}
	});
}