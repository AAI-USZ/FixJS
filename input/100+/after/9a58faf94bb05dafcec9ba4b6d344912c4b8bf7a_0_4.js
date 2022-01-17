function(subreddit, displayname) {
		this.getLatestShortcuts();
		var idx = -1;
		for (var i=0, len=modules['subredditManager'].mySubredditShortcuts.length; i<len; i++) {
			if (modules['subredditManager'].mySubredditShortcuts[i].subreddit.toLowerCase() == subreddit.toLowerCase()) {
				idx = i;
				break;
			}
		}
		if (idx != -1) {
			alert('Whoops, you already have a shortcut for that subreddit');
		} else {
			displayname = displayname || subreddit;
			subredditObj = {
				subreddit: subreddit,
				displayName: displayname
			}
			modules['subredditManager'].mySubredditShortcuts.push(subredditObj);
			if (RESUtils.proEnabled()) {
				if (typeof(modules['subredditManager'].RESPro) == 'undefined') {
					if (RESStorage.getItem('RESmodules.subredditManager.subredditShortcuts.RESPro.'+RESUtils.loggedInUser()) != null) {
						var temp = safeJSON.parse(RESStorage.getItem('RESmodules.subredditManager.subredditShortcuts.RESPro.'+RESUtils.loggedInUser()), 'RESmodules.subredditManager.subredditShortcuts.RESPro.'+RESUtils.loggedInUser());
					} else {
						var temp = { add: {}, del: {} };
					}
					modules['subredditManager'].RESPro = temp;
				}
				if (typeof(modules['subredditManager'].RESPro.add) == 'undefined') {
					modules['subredditManager'].RESPro.add = {}
				}
				if (typeof(modules['subredditManager'].RESPro.del) == 'undefined') {
					modules['subredditManager'].RESPro.del = {}
				}
				// add this subreddit next time we sync...
				modules['subredditManager'].RESPro.add[subreddit] = true;
				// make sure we don't run a delete on this subreddit next time we sync...
				if (typeof(modules['subredditManager'].RESPro.del[subreddit]) != 'undefined') delete modules['subredditManager'].RESPro.del[subreddit];
				RESStorage.setItem('RESmodules.subredditManager.subredditShortcuts.RESPro.'+RESUtils.loggedInUser(), JSON.stringify(modules['subredditManager'].RESPro));
			}
			RESStorage.setItem('RESmodules.subredditManager.subredditShortcuts.'+RESUtils.loggedInUser(), JSON.stringify(modules['subredditManager'].mySubredditShortcuts));
			modules['subredditManager'].redrawShortcuts();
			modules['subredditManager'].populateSubredditDropdown();
			if (RESUtils.proEnabled()) {
				modules['RESPro'].saveModuleData('subredditManager');
			}
			RESUtils.notification({ 
				header: 'Subreddit Manager Notification', 
				message: 'Subreddit shortcut added. You can edit by double clicking, or trash by dragging to the trash can.'
			});
		}
	}