function() {
	// cache a reference to opera.extension to speed things up a bit
	var ext = opera.extension;

	// This won't work for Opera 11.62 or below, so don't try
	if (!ext.tabGroups)
		return;

	/** Utility methods for working with tabs, tab groups and windows
	 * @namespace
	 */
	window.TabUtils = {
		/** Gets whether messages can be posted to a tab
		 * @param {BrowserTab} tab The tab to check
		 * @returns true if the tab exists and messages can be sent to it
		 */
		isAccessible: function(tab) {
			return (!!tab && !!tab.port);
		},
		
		/** Gets whether an object is a BrowserTab
		 * @param {object} item The object to test
		 * @returns {boolean} true if the object is a BrowserTab, false otherwise
		 */
		isTab: function(item) {
			//return item instanceof BrowserTab;
			return item.hasOwnProperty('faviconUrl');
		},
		
		/** Gets whether an object is a BrowserTabGroup
		 * @param {object} item The object to test
		 * @returns {boolean} true if the object is a BrowserTabGroup, false otherwise
		 */
		isGroup: function(item) {
			//return item instanceof BrowserTabGroup;
			return item.hasOwnProperty('collapsed');
		},
		

		/** Gets whether an object is a BrowserWindow
		 * @param {object} item The object to test
		 * @returns {boolean} true if the object is a BrowserTab, false otherwise
		 */
		isWindow: function(item) {
			return item instanceof BrowserWindow;
		},
		
		/** Gets the next tab or group within a tab or group's container
		 * @param {BrowserTab|BrowserTabGroup} item
		 * @returns {BrowserTab|BrowserTabGroup}
		 */
		nextSibling: function(item) {
			if (!!item.tabGroup)
				return item.tabGroup.at(item.position + 1);
			return item.browserWindow.at(item.position + 1);
		},
		
		/** Gets the previous tab or group within a tab or group's container
		 * @param {BrowserTab|BrowserTabGroup} item
		 * @returns {BrowserTab|BrowserTabGroup}
		 */
		previousSibling: function(item) {
			if (!!item.tabGroup)
				return item.tabGroup.at(item.position - 1);
			return item.browserWindow.at(item.position - 1);
		},
		
		/** Gets the tab immediately to the right of a tab or group
		 * @param {BrowserTab|BrowserTabGroup} item
		 * @returns {BrowserTab}
		 */
		nextTab: function(item) {
			var next = utils.nextSibling(item);
			if (!!item.tabGroup && !next) {
				next = item.browserWindow.at(item.tabGroup.position + 1);
			}
			
			if (utils.isGroup(next)) {
				next = utils.firstTab(next);
			}
			
			return next;
		},
		
		/** Gets the tab immediately to the left of a tab or group
		 * @param {BrowserTab|BrowserTabGroup} item
		 * @returns {BrowserTab}
		 */
		previousTab: function(item) {
			var prev = utils.previousSibling(item);
			if (!!item.tabGroup && !prev) {
				prev = item.browserWindow.at(item.tabGroup.position - 1);
			}
			
			if (utils.isGroup(prev)) {
				prev = utils.lastTab(prev);
			}
			
			return prev;
		},
		
		/** Gets the first tab within a tab group
		 * @param {BrowserTabGroup} group
		 */
		firstTab: function(group) {
			return group.at(0);
		},
		
		/** Gets the last tab within a tab group
		 * @param {BrowserTabGroup} group
		 */
		lastTab: function(group) {
			var length = group.tabs.getAll().length;
			return group.at(length - 1);
		}
	}


	function initWindows() {
		opera.extension.windows.getLastFocused();
		var utils = window.TabUtils;
		
		/** Moves a tab or tab group to a new position
		 * @param {number} from The position of the item to move
		 * @param {number} to The new position to move the item to
		 *	@returns {BrowserTab|BrowserTabGroup} The item which was moved, if any
		 *//**
		 * Moves a tab or tab group to a new position
		 * @param {BrowserTab|BrowserTabGroup} item The item to move
		 * @param {number} to The new position to move the item to
		 * @returns {BrowserTab|BrowserTabGroup} The item which was moved, if any
		 */
		BrowserWindow.prototype.move = function(from, to) {
			var item = (typeof from === 'number') ? this.at(from) : from;
			var before = (typeof position === 'number') ? this.at(to + 1) : to;
			
			if (!!item)
				this.insert(item, before);
			return item;
		}

		/** Gets the tab or tab group at a given position
		 * @param {number} position The position of the item to get
		 * @returns {BrowserTab|BrowserTabGroup} The item at the given position, if any
		 */
		BrowserWindow.prototype.at = function(position) {
			var groups = this.tabGroups.getAll();
			for (var i = 0; i < groups.length; i++)
				if (groups[i].position == position)
					return groups[i];

			var tabs = this.tabs.getAll();
			for (var i = 0; i < tabs.length; i++)
				if (tabs[i].position == position && !tabs[i].tabGroup)
					return tabs[i];

			return null;
		}
		
		/** Inserts a tab or tab group into the group after another tab or tab group
		 * @param {BrowserTab|BrowserTabGroup} tab The tab or tab group to insert
		 * @param {BrowserTab|BrowserTabGroup} child The tab or tab group after which the specified item should be inserted.
		 *	                                    This tab or tab group is expected to be a child of the window.
		 */
		BrowserWindow.prototype.insertAfter = function(item, child) {
			this.insert(item, child.nextSibling);
		}
		
		ext.windows.removeEventListener('create', initWindows, false);
	}

	function initGroups() {
		ext.tabGroups.getAll();
		var utils = window.TabUtils;
		
		/** Moves a tab to a new position within the group
		 * @param {number} from The position of the tab to move
		 * @param {number} to The new position to move the tab to
		 *	@returns {BrowserTab} The tab which was moved, if any
		 *//**
		 * Moves a tab to a new position within the group
		 * @param {BrowserTab} tab The tab to move
		 * @param {number} to The new position to move the item to
		 * @returns {BrowserTab} The item which was moved, if any
		 */
		BrowserTabGroup.prototype.move = function(from, to) {
			var item = (typeof from === 'number') ? this.at(from) : from;			
			var before = (typeof position === 'number') ? this.at(to + 1) : to;
			
			if (!!item)
				this.insert(item, before);
			return item;
		}

		/** Gets the tab at a given position within the group
		 * @param {number} position The position of the tab to get
		 * @returns {BrowserTab} The tab at the given position, if any
		 */
		BrowserTabGroup.prototype.at = function(position) {
			var tabs = this.tabs.getAll();
			for (var i = 0; i < tabs.length; i++)
				if (tabs[i].position == position)
					return tabs[i];

			return null;
		}
		
		/** Inserts a tab into the group after another tab
		 * @param {BrowserTab} tab The tab to insert
		 * @param {BrowserTab} child The tab after which the specified tab should be inserted.
		 *	                    This tab is expected to be a child of the group.
		 */
		BrowserTabGroup.prototype.insertAfter = function(tab, child) {
			this.insert(tab, child.nextSibling);
		}
		
		/** Gets the next tab or group within the window
		 * @name BrowserTabGroup#nextSibling
		 * @type BrowserTab|BrowserTabGroup
		 */
		Object.defineProperty(BrowserTabGroup.prototype, 'nextSibling', {
			get: function() { return utils.nextSibling(this); }
		});
		
		/** Gets the previous tab or group within the window
		 * @name BrowserTabGroup#previousSibling
		 * @type BrowserTab|BrowserTabGroup
		 */
		Object.defineProperty(BrowserTabGroup.prototype, 'previousSibling', {
			get: function() { return utils.previousSibling(this); }
		});
		
		/** Gets the leftmost tab in the group
		 * @name BrowserTabGroup#firstTab
		 * @type BrowserTab
		 */
		Object.defineProperty(BrowserTabGroup.prototype, 'firstTab', {
			get: function() { return utils.firstTab(this); }
		});
		
		/** Gets the rightmost tab in the group
		 * @name BrowserTabGroup#lastTab
		 * @type BrowserTab
		 */
		Object.defineProperty(BrowserTabGroup.prototype, 'lastTab', {
			get: function() { return utils.lastTab(this); }
		});

		ext.tabGroups.removeEventListener('create', initGroups, false);
	}
	
	function initTabs() {
		ext.tabs.getAll();
		var utils = window.TabUtils;
		
		/** Removes the tab from its current tab group and places it after the group.
		 * Does nothing if the tab is not in a group
		 * @param {boolean} [before] If true, the tab will be placed before the group instead of after it.
		 */
		BrowserTab.prototype.ungroup = function(before) {
			if (this.tabGroup) {
				if (before)
					this.browserWindow.insert(this, this.tabGroup);
				else
					this.browserWindow.insertAfter(this, this.tabGroup);
			}
				
		}
		
		/** Gets the next tab or group within the tab's container
		 * @name BrowserTab#nextSibling
		 * @type BrowserTab|BrowserTabGroup
		 */
		Object.defineProperty(BrowserTab.prototype, 'nextSibling', {
			get: function() { return utils.nextSibling(this); }
		});
		
		/** Gets the previous tab or group within the tab's container
		 * @name BrowserTab#previousSibling
		 * @type BrowserTab|BrowserTabGroup
		 */
		Object.defineProperty(BrowserTab.prototype, 'previousSibling', {
			get: function() { return utils.previousSibling(this); }
		});
		
		/** Gets the tab directly after this one in the tab bar
		 * @name BrowserTab#nextTab
		 * @type BrowserTab
		 */
		Object.defineProperty(BrowserTab.prototype, 'nextTab', {
			get: function() { return utils.nextTab(this); }
		});
		
		/** Gets the tab directly before this one in the tab bar
		 * @name BrowserTab#previousTab
		 * @type BrowserTab
		 */
		Object.defineProperty(BrowserTab.prototype, 'previousTab', {
			get: function() {return utils.previousTab(this);}
		});
		
		ext.tabs.removeEventListener('create', initTabs, false);
	}

	// Fix for bug where Opera doesn't properly ungroup tabs before creating a 
	// new group, and stuff breaks and Opera eventually crashes.
	BrowserTabGroupManager.prototype._create = BrowserTabGroupManager.prototype.create;
	BrowserTabGroupManager.prototype.create = function(tabs, properties, before) {
		for (var i = 0; i < tabs.length; i++)
			tabs[i].ungroup(true);
		
		return this._create(tabs, properties, before);
	}

	// BrowserWindow, BrowserTabGroup and BrowserTab don't show up in window until
	// we're handed a reference to one such object, so get a reference to at least
	// one object of each type.
	ext.windows.getLastFocused();
	ext.tabGroups.getAll();
	ext.tabs.getAll();
	
	// If we couldn't get a reference to any of the three types, initialize the
	// utility methods after the first object of that type is created.
	try { BrowserTabGroup; initGroups(); } catch (e) { ext.tabGroups.addEventListener('create', initGroups, false) }
	try { BrowserWindow; initWindows(); } catch (e) { ext.windows.addEventListener('create', initWindows, false) }
	try { BrowserTab; initTabs(); } catch (e) { ext.tabs.addEventListener('create', initTabs, false) }

}