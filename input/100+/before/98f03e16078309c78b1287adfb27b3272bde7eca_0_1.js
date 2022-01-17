function() {
		RESUtils.addCSS("#userbarToggle { position: absolute; top: 0px; left: -5px; width: 16px; padding-right: 3px; height: 100%; font-size: 15px; border-radius: 4px 0px 0px 4px; color: #a1bcd6; display: inline-block; background-color: #dfecf9; border-right: 1px solid #cee3f8; cursor: pointer; text-align: right; line-height: 24px; }");
		RESUtils.addCSS("#header-bottom-right .user { margin-left: 16px; }");
		// RESUtils.addCSS(".userbarHide { background-position: 0px -137px; }");
		RESUtils.addCSS("#userbarToggle.userbarShow { left: -12px; }");
		RESUtils.addCSS(".res-navTop #userbarToggle.userbarShow { top:0 }");
		this.userbar = document.getElementById('header-bottom-right');
		if (this.userbar) {
			this.userbarToggle = createElementWithID('div','userbarToggle');
			this.userbarToggle.innerHTML = '&raquo;';
			this.userbarToggle.setAttribute('title','Toggle Userbar');
			addClass(this.userbarToggle, 'userbarHide');
			this.userbarToggle.addEventListener('click', function(e) {
				modules['styleTweaks'].toggleUserBar();
			}, false);
			this.userbar.insertBefore(this.userbarToggle, this.userbar.firstChild);
			var currHeight = $(this.userbar).height();
			// $(this.userbarToggle).css('height',currHeight+'px');
			if (RESStorage.getItem('RESmodules.styleTweaks.userbarState') == 'hidden') {
				this.toggleUserBar();
			}
		}
	}