function testReadApi_containsValue(t){
			var store = dojox.data.tests.stores.QueryReadStore.getStore();

			var d = new doh.Deferred();
			function onComplete(items, request){
				var item = items[0];
				t.assertTrue(store.containsValue(item, "name", "Alaska"));
			}
			store.fetch({
				query:{q:"Alaska"},
				onComplete: d.getTestCallback(onComplete)
			});
			return d; //Object
		}