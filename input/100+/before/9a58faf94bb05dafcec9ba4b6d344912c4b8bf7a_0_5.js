function(subreddit) {
		this.getLatestShortcuts();
		console.log('remove: '+subreddit);
		var idx = -1;
		for (var i=0, len=modules['subredditManager'].mySubredditShortcuts.length; i<len; i++) {
			console.log(modules['subredditManager'].mySubredditShortcuts[i].subreddit);
			if (modules['subredditManager'].mySubredditShortcuts[i].subreddit == subreddit) {
				idx = i;
				break;
			}
		}
		if (idx != -1) {
			modules['subredditManager'].mySubredditShortcuts.splice(idx,1);
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
				// delete this subreddit next time we sync...
				modules['subredditManager'].RESPro.del[subreddit] = true;
				// make sure we don't run an add on this subreddit
				if (typeof(modules['subredditManager'].RESPro.add[subreddit]) != 'undefined') delete modules['subredditManager'].RESPro.add[subreddit];
				RESStorage.setItem('RESmodules.subredditManager.subredditShortcuts.RESPro.'+RESUtils.loggedInUser(), JSON.stringify(modules['subredditManager'].RESPro));
			}
			RESStorage.setItem('RESmodules.subredditManager.subredditShortcuts.'+RESUtils.loggedInUser(), JSON.stringify(modules['subredditManager'].mySubredditShortcuts));
			modules['subredditManager'].redrawShortcuts();
			modules['subredditManager'].populateSubredditDropdown();
			if (RESUtils.proEnabled()) {
				modules['RESPro'].saveModuleData('subredditManager');
			}
		}
	}