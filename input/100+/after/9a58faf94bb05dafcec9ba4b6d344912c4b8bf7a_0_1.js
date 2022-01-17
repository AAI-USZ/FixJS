f		// This is the init function for Manage Subreddits - it'll get your preferences and redraw the top bar.
		this.redrawSubredditBar();
		// Listen for subscriptions / unsubscriptions from reddits so we know to reload the JSON string...
		// also, add a +/- shortcut button...
		if ((RESUtils.currentSubreddit()) && (this.options.subredditShortcut.value == true)) {
			var subButtons = document.querySelectorAll('.fancy-toggle-button');
			// for (var h=0, len=currentSubreddits.length; h<len; h++) {
			for (var h=0, len=subButtons.length; h<len; h++) {
				var subButton = subButtons[h];
				if ((RESUtils.currentSubreddit().indexOf('+') == -1) && (RESUtils.currentSubreddit() != 'mod')) {
					var thisSubredditFragment = RESUtils.currentSubreddit();
					var isMulti = false;
				} else if ($(subButton).parent().hasClass('subButtons')) {
					var isMulti = true;
					var thisSubredditFragment = $(subButton).parent().parent().find('a.title').text();
				} else {
					var isMulti = true;
					var thisSubredditFragment = $(subButton).next().text();
				}
				if (! ($('#subButtons-'+thisSubredditFragment).length>0)) {
					var subButtonsWrapper = $('<div id="subButtons-'+thisSubredditFragment+'" class="subButtons" style="margin: 0 !important;"></div>');
					$(subButton).wrap(subButtonsWrapper);
					// move this wrapper to the end (after any icons that may exist...)
					if (isMulti) {
						var theWrap = $(subButton).parent();
						$(theWrap).appendTo($(theWrap).parent());
					}
				}
				subButton.addEventListener('click',function() {
					// reset the last checked time for the subreddit list so that we refresh it anew no matter what.
					RESStorage.setItem('RESmodules.subredditManager.subreddits.lastCheck.'+RESUtils.loggedInUser(),0);
				},false);
				var theSC = document.createElement('span');
				theSC.setAttribute('style','display: inline-block !important;');
				theSC.setAttribute('class','RESshortcut RESshortcutside');
				theSC.setAttribute('subreddit',thisSubredditFragment);
				var idx = -1;
				for (var i=0, sublen=modules['subredditManager'].mySubredditShortcuts.length; i<sublen; i++) {
					if (modules['subredditManager'].mySubredditShortcuts[i].subreddit.toLowerCase() == thisSubredditFragment.toLowerCase()) {
						idx=i;
						break;
					}
				}
				if (idx != -1) {
					theSC.innerHTML = '-shortcut';
					theSC.setAttribute('title','Remove this subreddit from your shortcut bar');
					addClass(theSC,'remove');
				} else {
					theSC.innerHTML = '+shortcut';
					theSC.setAttribute('title','Add this subreddit to your shortcut bar');
				}
				theSC.addEventListener('click', modules['subredditManager'].toggleSubredditShortcut, false);
				// subButton.parentNode.insertBefore(theSC, subButton);
				// theSubredditLink.appendChild(theSC);
				$('#subButtons-'+thisSubredditFragment).append(theSC);
				var next = $('#subButtons-'+thisSubredditFragment).next();
				if ($(next).hasClass('title') && (! $('#subButtons-'+thisSubredditFragment).hasClass('swapped'))) {
					$('#subButtons-'+thisSubredditFragment).before($(next));
					$('#subButtons-'+thisSubredditFragment).addClass('swapped');
				}
			}
		}
		// If we're on the reddit-browsing page (/reddits), add +shortcut and -shortcut buttons...
		if (location.href.match(/https?:\/\/www.reddit.com\/reddits\/?(\?[\w=&]+)*/)) {
			this.browsingReddits();
		}
	},
