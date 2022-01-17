function testReadApi_isItemLoaded(t){
			// summary:
			// description:
			var store = dojox.data.tests.stores.QueryReadStore.getStore();
			
			var d = new doh.Deferred();
			function onComplete(items, request){
				var item = items[0];
				// The good case(s).
				t.assertTrue(store.isItemLoaded(item));
				
				d.callback(true);
			}
			store.fetch({query:{q:"Alabama"}, onComplete: onComplete});
			return d; //Object
		}