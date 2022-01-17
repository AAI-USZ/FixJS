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

			var addedView = store.addView({
				name: 'View3',
				filterFn: function(rec){
					return rec.get('Age') > 20;
				}
			});

			var views = store.getViews();

			expect(views.View3.store.getCount()).toEqual(7);
		}