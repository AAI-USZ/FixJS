function() {
		if ( this.firstRefreshDone === undefined )
			return;

		if ( ! this.firstRefreshDone ) {
			// initialize our three divs
			this.topProxy 			= Ext.Element.create({ cls: 'ux-top-proxy' });
			this.listContainer 	= Ext.Element.create({ cls: 'ux-list-container' });
			this.bottomProxy 		= Ext.Element.create({ cls: 'ux-bottom-proxy' });

			// append them to the inner element of the list
			this.topProxy.appendTo(			this.innerElement);
			this.listContainer.appendTo(this.innerElement);
			this.bottomProxy.appendTo(	this.innerElement);

			// stripe record indexes for better performance later
			this.stripeRecordIndexes();

			// if this is a grouped list, or one with an index bar, initialize
			// relevant variables
			if (this.getGrouped() || this.getIndexBar())
			{
				this.createGroupingMap();
				if (this.getGrouped())
				{
					this.groupHeaders = [];
					this.createHeader();
				}
			}

			// set initial proxy heights
			this.topProxy.setHeight(0);
			this.bottomProxy.setHeight(0);

			// show & buffer first items in the list
			var store = this.getStore();
			if ( store && store.getCount() > 0 )
			{
				this.refreshItemListAt(0); // renders first this.getMinimumItems() nodes in store
			}
			this.firstRefreshDone = true;
		}
		else
		{
			if (this.getGrouped() || this.getIndexBar())
			{
				this.createGroupingMap();
			}
			this.updateItemList();

			store = this.getStore();
			if (store && store.getRange() < 1) {
				this.onStoreClear();
			}
			else {
				this.hideEmptyText();
			}
		}
	}