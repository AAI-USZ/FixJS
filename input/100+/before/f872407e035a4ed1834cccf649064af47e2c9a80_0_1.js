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