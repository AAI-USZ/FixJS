function () {
		var me = this,
            store = me.store,
            proxy = store.getProxy(),
            val;
            
        if (me.hasSearch) {
            me.setValue('');
            proxy.extraParams[me.paramName] = '';
            store.currentPage = 1;
            store.load({ start: 0 });
            me.hasSearch = false;
            
            me.triggerCell.item(0).setDisplayed('none');
            me.doComponentLayout();
        }
	}