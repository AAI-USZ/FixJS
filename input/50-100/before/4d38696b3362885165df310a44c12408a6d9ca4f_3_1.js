function(){
			var store = me.createStore([{
				name: 'View1',
				filterFn: Ext.emptyFn
			}, {
				name: 'View2',
				filterFn: Ext.emptyFn
			}]);

			expect(Ext.isObject(store.getViews())).toEqual(true);
			expect(store.getViews().View1).toBeDefined();
			expect(store.getViews().View2).toBeDefined();

		}