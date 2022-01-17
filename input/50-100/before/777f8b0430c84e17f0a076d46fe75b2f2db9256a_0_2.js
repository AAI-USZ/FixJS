function testReadApi_containsValue(t){
			// summary:
			// description:
			var store = dojox.data.tests.stores.QueryReadStore.getStore();

			var d = new doh.Deferred();
			function onComplete(items, request){
				var item = items[0];
				t.assertTrue(store.containsValue(item, "name", "Alaska"));
				d.callback(true);
			}
			store.fetch({query:{q:"Alaska"}, onComplete: onComplete});
			return d; //Object
		}