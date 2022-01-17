function(actionBar, screen) {
		
		var actions = actionBar.querySelectorAll('[data-bb-type=action]'),
			visibleButtons = [],
			overflowButtons = [],
			visibleTabs = [],
			overflowTabs = [],
			action,
			target,
			caption,
			style,
			lastStyle,
			tabRightShading,
			backBtn,
			actionContainer = actionBar,
			btnWidth,
			res = (bb.device.isPlayBook) ? 'lowres' : 'hires',
			icon,
			color = bb.actionBar.color,
			j;
			
		actionBar.backBtnWidth = 0;
		actionBar.actionOverflowBtnWidth = 0;
		actionBar.setAttribute('class','bb-bb10-action-bar-'+res+' bb-bb10-action-bar-' + bb.actionBar.color);
		actionBar.visibleTabs = visibleTabs;
		actionBar.visibleButtons = visibleButtons;
		actionBar.overflowButtons = overflowButtons;
		
		// Gather our visible and overflow tabs and buttons
		for (j = 0; j < actions.length; j++) {
			action = actions[j];
			if (action.hasAttribute('data-bb-style')) {
				style = action.getAttribute('data-bb-style').toLowerCase();
				if (style == 'button') {
					if (action.hasAttribute('data-bb-overflow') && (action.getAttribute('data-bb-overflow').toLowerCase() == 'true')) {
						overflowButtons.push(action);
					} else {
						visibleButtons.push(action);
					}
				} else {
					if (action.hasAttribute('data-bb-overflow') && (action.getAttribute('data-bb-overflow').toLowerCase() == 'true')) {
						overflowTabs.push(action);
					} else {
						visibleTabs.push(action);
					}
				}
			}
		}
					
		// Create the back button if it has one and there are no tabs in the action bar
		if (actionBar.hasAttribute('data-bb-back-caption') && actionBar.querySelectorAll('[data-bb-style=tab]').length == 0) {		
			backBtn = document.createElement('div');
			backBtn.innerHTML = actionBar.getAttribute('data-bb-back-caption');
			backBtn.setAttribute('class','bb-bb10-action-bar-back-button-'+res+' bb-bb10-action-bar-back-button-'+res+'-' + color);
			backBtn.onclick = bb.popScreen;
			// Set tab coloring
			backBtn.normal = 'bb-bb10-action-bar-tab-normal-'+color;
			backBtn.highlight = 'bb-bb10-action-bar-tab-selected-'+color;
			actionBar.backBtn = backBtn;
			// Create a table to hold the back button and our actions
			var table = document.createElement('table'),
				tr = document.createElement('tr'),
				td = document.createElement('td');
			actionBar.appendChild(table);
			table.appendChild(tr);
			table.setAttribute('class','bb-bb10-action-bar-table');
			// Create the container for the back button
			if (bb.device.isPlayBook) {
				actionBar.backBtnWidth = 86;
				td.style.width = actionBar.backBtnWidth+'px';
			} else {
				actionBar.backBtnWidth = 178;
				td.style.width = actionBar.backBtnWidth+'px';
			}
			tr.appendChild(td);
			td.appendChild(backBtn);
			// Create the container for the rest of the actions
			td = document.createElement('td');
			td.style.width = '100%';
			tr.appendChild(td);
			actionContainer = td;
			// Add the rest of the actions to the second column
			for (j = 0; j < actions.length; j++) {
				action = actions[j];
				td.appendChild(action);
			}
		}

		// If we have "button" actions marked as overflow we need to show the more menu button
		if (overflowButtons.length > 0) {
			actionBar.actionOverflowBtnWidth = (bb.device.isPlayBook) ? 77: 154;
			actionBar.menu = bb.contextMenu.create(screen);
			actionBar.appendChild(actionBar.menu);
			// Create our action bar overflow button
			action = document.createElement('div');
			action.setAttribute('data-bb-type','action');
			action.setAttribute('data-bb-style','button');
			action.setAttribute('data-bb-img','overflow');
			action.onclick = actionBar.menu.show;
			// Insert our more button
			actionContainer.appendChild(action);
			visibleButtons.push(action);
		}
		
		// Determines the total width of the screen
		actionBar.getTotalWidth = function() {
				return window.innerWidth;	
			}
		actionBar.getTotalWidth = actionBar.getTotalWidth.bind(actionBar);
		
		// Determines how much width there is to use not including built in system buttons on the bar
		actionBar.getUsableWidth = function() {
				if (this.backBtn && (this.actionOverflowBtnWidth > 0) && (this.visibleButtons.length >= 5)) {
					return this.getTotalWidth() - this.backBtnWidth;
				}
				else if ((this.actionOverflowBtnWidth > 0) && ((this.visibleTabs.length + this.visibleButtons.length) >= 6)) {
					return this.getTotalWidth() - this.backBtnWidth;
				} else {
					return this.getTotalWidth() - this.backBtnWidth - this.actionOverflowBtnWidth;	
				}
			}
		actionBar.getUsableWidth = actionBar.getUsableWidth.bind(actionBar);
		
		// Create our function to calculate the widths of the inner action items 
		actionBar.calculateActionWidths = function() {
							var result,
								totalWidth = this.getUsableWidth(),
								visibleActions = this.visibleButtons.length + this.visibleTabs.length,
								numUserActions = (this.overflowButtons.length > 0) ? visibleActions - 1 : visibleActions; // Actions that aren't built in Actionbar buttons
								
							if (this.backBtn) {
								if (visibleActions < 5) {
									result = Math.floor(totalWidth/numUserActions);
								} else {
									result = Math.floor(totalWidth/4);
								}
							} else {
								if (visibleActions < 6) {
									result = Math.floor(totalWidth/numUserActions);
								} else {
									result = Math.floor(totalWidth/5);
								}
							}
							return result;
						};
		actionBar.calculateActionWidths = actionBar.calculateActionWidths.bind(actionBar);
		// Get our button width
		btnWidth = actionBar.calculateActionWidths();
		
		// Add all of our overflow button actions
		for (j = 0; j < overflowButtons.length; j++) {
			action = overflowButtons[j];
			action.res = res;
			actionBar.menu.add(action);
		}
		
		// Apply all our tab styling
		var tabMargins = 2,
			numVisibleTabs = visibleTabs.length;
		for (j = 0; j < numVisibleTabs; j++) {
			action = visibleTabs[j];
			// Don't add any more than 5 items on the action bar
			if (j > 4) {
				action.style.display = 'none';
				continue;			
			}
			action.res = res;
			caption = action.innerHTML;
			// Size our last visible tab differently
			if ((j == visibleTabs.length -1) && (j < 4)) {
				action.style.width = (btnWidth - (tabMargins + 1)) + 'px';  
			} else if ((j == visibleTabs.length -1) && (j == 4)) {
				// Stretch the last tab if actionbar only has tabs in case of any kind of rounding errors based on division  
				action.style.width = (actionBar.getUsableWidth() - (4 * btnWidth) - tabMargins) + 'px';
			} else {
				action.style.width = (btnWidth - tabMargins) + 'px'; 
			}
			action.actionBar = actionBar;
			action.innerHTML = '';
			action.normal = 'bb-bb10-action-bar-action-'+res+' bb-bb10-action-bar-tab-'+color+' bb-bb10-action-bar-tab-normal-'+color;
			action.highlight = action.normal + ' bb-bb10-action-bar-tab-selected-'+color;
			action.setAttribute('class',action.normal);
			if (action.hasAttribute('data-bb-selected') && (action.getAttribute('data-bb-selected').toLowerCase() == 'true')) {
				bb.actionBar.highlightAction(action);
			} 
			// Add the icon
			icon = document.createElement('img');
			icon.setAttribute('src',action.getAttribute('data-bb-img'));
			icon.setAttribute('class','bb-bb10-action-bar-icon-'+res);
			action.appendChild(icon);
			// Set our caption
			var display = document.createElement('div');
			display.setAttribute('class','bb-bb10-action-bar-action-display-'+res);
			display.innerHTML = caption;
			action.appendChild(display);
			// Make the last tab have a smaller border and insert the shading
			if ((j == visibleTabs.length-1) && (j < 4)) {
				action.style['border-right-width'] = '1px';
			} 	
			
			// Add our click listener
			action.addEventListener('click',function (e) {
				var i,
					action,
					tabs = this.actionBar.visibleTabs,
					firstTab = false;
					
				for (i = 0; i < tabs.length; i++) {
					action = tabs[i];
					if (action == this) {
						bb.actionBar.highlightAction(action);
						firstTab = (i == 0);
					} else {
						bb.actionBar.unhighlightAction(action);
					}					
				}
				
			},false);
		}
		
		// Apply all our button styling
		lastStyle = (visibleTabs.length > 0) ? 'tab' : 'button';
		for (j = 0; j < visibleButtons.length; j++) {
			action = visibleButtons[j];
			action.res = res;
			caption = action.innerHTML;
			// Don't add any more than 5 items on the action bar
			if ((((numVisibleTabs + j) > 4)) || (actionBar.backBtn && (j > 3))) {
				action.style.display = 'none';
				continue;			
			}
			// See if the last action was a tab
			if (lastStyle == 'tab') {
				action.normal = 'bb-bb10-action-bar-action-'+res+' bb-bb10-action-bar-button-'+color+' bb-bb10-action-bar-button-tab-left-'+res+'-'+color;
			} else {
				action.normal = 'bb-bb10-action-bar-action-'+res+' bb-bb10-action-bar-button-'+color;
			}
			action.innerHTML = '';
			action.setAttribute('class',action.normal);
			// Add the icon
			icon = document.createElement('img');
			if (action.getAttribute('data-bb-img') == 'overflow') {
				// Set our transparent pixel
				icon.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
										'/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wEFxQXKc14qEQAAAAZdEVYdENv'+
										'bW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAADUlEQVQI12NgYGBgAAAABQABXvMqOgAAAABJ'+
										'RU5ErkJggg==');
				icon.setAttribute('class','bb-bb10-action-bar-icon-'+res+' bb-bb10-action-bar-overflow-button-'+res+'-'+color);
				
				// If it is next to a tab, stretch it so that the right shading lines up
				if (lastStyle == 'tab') {
					// Stretch the last button if all tabs are before the overflow button  
					action.style.width = (actionBar.getTotalWidth() - (numVisibleTabs * btnWidth)) + 'px';
				} else {
					action.style.width = actionBar.actionOverflowBtnWidth + 'px'; 
					action.style.float = 'right';
				}
			} else {
				icon.setAttribute('src',action.getAttribute('data-bb-img'));
				icon.setAttribute('class','bb-bb10-action-bar-icon-'+res);
				action.style.width = btnWidth + 'px'; 
			}
			action.appendChild(icon);
			lastStyle = 'button';
			
			// Set our caption
			var display = document.createElement('div');
			display.setAttribute('class','bb-bb10-action-bar-action-display-'+res);
			display.innerHTML = caption;
			action.appendChild(display);	
		}
		// Set the proper header height
		/*if (actionBar.menu) {
			actionBar.menu.setHeaderHeight();
		}*/
	}