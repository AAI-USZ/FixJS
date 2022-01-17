function(e) {
		if (e.stopPropagation) {
			e.stopPropagation(); // Stops from triggering the click on the bigger box, which toggles this window closed...
		}
		var idx = -1;
		for (var i=0, len=modules['subredditManager'].mySubredditShortcuts.length; i<len; i++) {
			if (modules['subredditManager'].mySubredditShortcuts[i].subreddit.toLowerCase() == e.target.getAttribute('subreddit').toLowerCase()) {
				idx=i;
				break;
			}
		}
		if (idx != -1) {
			// modules['subredditManager'].mySubredditShortcuts.splice(idx,1);
			modules['subredditManager'].removeSubredditShortcut(e.target.getAttribute('subreddit'));
			e.target.setAttribute('title','Add this subreddit to your shortcut bar');
			e.target.innerHTML = '+shortcut';
			removeClass(e.target,'remove');
		} else {
			// modules['subredditManager'].mySubredditShortcuts.push(e.target.getAttribute('subreddit'));
			modules['subredditManager'].addSubredditShortcut(e.target.getAttribute('subreddit'));
			e.target.setAttribute('title','Remove this subreddit from your shortcut bar');
			e.target.innerHTML = '-shortcut';
			addClass(e.target,'remove');
		}
		modules['subredditManager'].redrawShortcuts();
	}