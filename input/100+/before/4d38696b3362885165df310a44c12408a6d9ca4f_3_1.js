function(){
			var store = me.createStore([{
				name: 'View1',
				filterFn: Ext.emptyFn
			}, {
				name: 'View2',
				filterFn: Ext.emptyFn
			}]);

			var views = store.getViews();

			Ext.Object.each(views, function(key, val){
				expect(val.name).toEqual(key);
				expect(val.store).toBeDefined();
				expect(val.store.$className).toEqual('Ext.data.Store');
			}, this);
		}