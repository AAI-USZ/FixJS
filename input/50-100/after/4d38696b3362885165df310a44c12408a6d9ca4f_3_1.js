function(){
			var store = me.createStore([{
				name: 'View1',
				filterFn: Ext.emptyFn
			}, {
				name: 'View2',
				filterFn: Ext.emptyFn
			}]);

			expect(Ext.isObject(store.getViewInstances())).toEqual(true);
			expect(store.getViewInstances().View1).toBeDefined();
			expect(store.getViewInstances().View2).toBeDefined();

		}