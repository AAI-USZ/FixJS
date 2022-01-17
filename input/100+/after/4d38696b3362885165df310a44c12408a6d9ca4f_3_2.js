function(){
			var store = me.createStore([{
				name: 'View1',
				filterFn: function(rec){
					return rec.get('Age') > 20;
				}
			}, {
				name: 'View2',
				filterFn: function(rec){
					return rec.get('Age') < 20;
				}
			}]);

			var views = store.getViewInstances();

			expect(views.View1.store.getCount()).toEqual(7);
			expect(views.View2.store.getCount()).toEqual(4);
		}