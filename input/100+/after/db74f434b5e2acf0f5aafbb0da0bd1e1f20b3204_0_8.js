function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// do stuff now!
			// this is where your code goes...
			this.userLink = document.querySelector('#header-bottom-right > span.user > a');
			if (this.userLink) {
				this.userLink.style.marginRight = '2px';
				// this.loggedInUser = userLink.innerHTML;
				this.loggedInUser = RESUtils.loggedInUser();
				// var downArrowIMG = 'data:image/gif;base64,R0lGODlhBwAEALMAAAcHBwgICAoKChERETs7Ozo6OkJCQg0NDRoaGhAQEAwMDDIyMv///wAAAAAAAAAAACH5BAEAAAwALAAAAAAHAAQAAAQQ0BSykADsDAUwY4kQfOT4RQA7';
				if (this.options.dropDownStyle.value == 'alien') {
					this.downArrowOverlay = $('<span id="RESAccountSwitcherIconOverlay"></span>');
					this.downArrow = $('<span id="RESAccountSwitcherIcon"></span>');
				} else {
					this.downArrowOverlay = $('<span id="RESAccountSwitcherIconOverlay"><span class="downArrow"></span></span>');
					this.downArrow = $('<span id="RESAccountSwitcherIcon"><span class="downArrow"></span></span>');
				}
				$(this.downArrowOverlay).click(function() {
					modules['accountSwitcher'].toggleAccountMenu(false);
					modules['accountSwitcher'].manageAccounts();
				})
				$(document.body).append(this.downArrowOverlay);
				$(this.downArrow).click(function() {
					modules['accountSwitcher'].toggleAccountMenu(true);
				});
				$(this.downArrowOverlay).mouseleave(function() {
					modules['accountSwitcher'].dropdownTimer = setTimeout(function() {
						modules['accountSwitcher'].toggleAccountMenu(false);
					}, 1000);
				});


				// insertAfter(this.userLink, downArrow);
				$(this.userLink).after(this.downArrow);

				this.accountMenu = $('<ul id="RESAccountSwitcherDropdown" class="RESDropdownList"></ul>')
				$(this.accountMenu).mouseenter(function() {
					clearTimeout(modules['accountSwitcher'].dropdownTimer);
				});
				$(this.accountMenu).mouseleave(function() {
					modules['accountSwitcher'].toggleAccountMenu(false);
				});
				// GM_addStyle(css);
				var accounts = this.options.accounts.value;
				if (accounts != null) {
					var accountCount = 0;
					for (var i=0, len=accounts.length; i<len; i++) {
						var thisPair = accounts[i];
						if (thisPair[0] != this.loggedInUser || this.options.showCurrentUserName.value){
							accountCount++;
							var thisLI = document.createElement('LI');
							addClass(thisLI, 'accountName');
							if (thisPair[0] == this.loggedInUser) {
								addClass(thisLI, 'active');
							}
							thisLI.setAttribute('data-username',thisPair[0]);
							thisLI.innerHTML = thisPair[0];
							thisLI.style.cursor = 'pointer';
							thisLI.addEventListener('click', function(e) {
								e.preventDefault();
								// modules['accountSwitcher'].toggleAccountMenu(false);
								modules['accountSwitcher'].switchTo(e.target.getAttribute('data-username'));
							}, true);
							$(this.accountMenu).append(thisLI);
						}
					}
					var thisLI = document.createElement('LI');
					addClass(thisLI, 'accountName');
					thisLI.innerHTML = '+ add account';
					thisLI.style.cursor = 'pointer';
					thisLI.addEventListener('click', function(e) {
						e.preventDefault();
						modules['accountSwitcher'].toggleAccountMenu(false);
						modules['accountSwitcher'].manageAccounts();
					}, true);
					$(this.accountMenu).append(thisLI);
				}
				$(document.body).append(this.accountMenu);
			}
		}
	}