function (actions, context) {
		console.groupCollapsed("SmartWFM.lib.Menu.get()");
		console.debug("Arguments: ", arguments);

		var menu = [];
		var actionName;
		var Item;
		var menuItem;
		var i;

		if (actions === undefined || typeof(actions) !== 'object') {
			console.warning('Wrong actions type or actions not given');
			console.groupEnd();

			return undefined;
		}
		for (i = 0; i < actions.length; i++) {
			actionName = actions[i];

			// Wrong type? Continue with next one.
			if (actionName === undefined || typeof(actionName) !== 'string') {
				console.warning("Name of the action not given or not a string: ", actionName);
				continue;
			}

			if (actionName === '|') {
				console.log('Found(Separator): Separator');
				menu.push(new Ext.menu.Separator());
			} else {
				Item = this.items[actionName];

				console.log('Found(Item): ', Item);

				if (Item !== undefined) {
					menuItem = new Item({
						context: context
					});
					if (menuItem.disabled === false) {
						menu.push(menuItem);
					}
				}
			}
		}

		if (menu.length === 0) {
			console.groupEnd();

			return undefined;
		} else {
			function trimSeparators(items) {
				// trims separators
				// currently only at beginning and end
				// see todo ;)
				var modified = false;
				// check first element
				if (items[0] != undefined && items[0].getXType() == 'menuseparator') {
					items.shift(); // remove this element
					modified = true;
				}
				// check last element
				if (items[items.length-1] != undefined && items[items.length-1].getXType() == 'menuseparator') {
					items.pop(); // remove this element
					modified = true;
				}
				// todo - remove duplicates of 'menuseparator'
				if (modified == true) // redo if something was deleted
					items = trimSeparators(items);
				return items;
			}
			menu = trimSeparators(menu);
			console.groupEnd();

			return new Ext.menu.Menu({
				style: {
					overflow: 'visible'     // For the Combo popup
				},
				items : menu
			});
		}
	}