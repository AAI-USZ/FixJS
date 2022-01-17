function(){
			var store = me.createStore([{
				name: 'View1',
				filterFn: Ext.emptyFn
			}, {
				name: 'View2',
				filterFn: Ext.emptyFn
			}]);

			var addedView = store.addView({
				name: 'View3',
				filterFn: Ext.emptyFn
			});

			var views = store.getViewInstances();

			expect(views.View3).toBeDefined();
			expect(addedView).toEqual(views.View3); // returned view is same as retrieved view
			expect(Ext.isObject(views.View3)).toEqual(true);
			expect(views.View3.store).toBeDefined();
			expect(views.View3.store.$className).toEqual('Ext.data.Store');

		}