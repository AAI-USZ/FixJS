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