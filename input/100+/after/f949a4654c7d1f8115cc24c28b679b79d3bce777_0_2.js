function() {
		var mainmenuUL = document.body.querySelector('#header-bottom-left ul.tabmenu');
		if (mainmenuUL) {
			var savedRegex = new RegExp(/https?:\/\/([a-z]+).reddit.com\/user\/[\w]+\/saved\/?/i);
			var menuItems = mainmenuUL.querySelectorAll('li');
			for (var i=0, len=menuItems.length;i<len;i++) {
				var savedLink = menuItems[i].querySelector('a');
				if ((hasClass(menuItems[i], 'selected')) && (savedRegex.test(savedLink.href))) {
					menuItems[i].addEventListener('click', function(e) {
						e.preventDefault();
						modules['saveComments'].showSavedTab('links');
					}, true);
				}
				var thisUser = RESUtils.loggedInUser() || '';
				if (savedRegex.test(savedLink.href)) {
					this.savedLinksTab = menuItems[i];
					savedLink.innerHTML = 'saved links';
				}
			}
			this.savedCommentsTab = document.createElement('li');
			this.savedCommentsTab.innerHTML = '<a id="savedCommentsTab" href="javascript:void(0);">saved comments</a>';
			if (savedRegex.test(location.href)) {
				this.savedCommentsTab.addEventListener('click', function(e) {
					e.preventDefault();
					modules['saveComments'].showSavedTab('comments');
				}, true);
			} else {
				this.savedCommentsTab.addEventListener('click', function(e) {
					e.preventDefault();
					location.href = location.protocol + '//www.reddit.com/saved/#comments';
				}, true);
			}
			if (this.savedLinksTab != null) {
				insertAfter(this.savedLinksTab, this.savedCommentsTab);
			}
		}
	}