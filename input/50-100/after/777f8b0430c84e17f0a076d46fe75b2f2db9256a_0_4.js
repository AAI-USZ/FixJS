function testReadApi_isItemLoaded(t){
			var store = dojox.data.tests.stores.QueryReadStore.getStore();
			
			var d = new doh.Deferred();
			function onComplete(items, request){
				var item = items[0];
				// The good case(s).
				t.assertTrue(store.isItemLoaded(item));
			}
			store.fetch({
				query:{q:"Alabama"},
				onComplete: d.getTestCallback(onComplete)
			});
			return d; //Object
		}