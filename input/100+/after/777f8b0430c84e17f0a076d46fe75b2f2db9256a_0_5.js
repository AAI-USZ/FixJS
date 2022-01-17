function testReadApi_getAttributes(t){
			var store = dojox.data.tests.stores.QueryReadStore.getStore();
			
			var d = new doh.Deferred();
			function onComplete(items, request){
				var item = items[0];
				// The good case(s).
				t.assertEqual(['id', 'name', 'label', 'abbreviation', 'capital'], store.getAttributes(item));
				t.assertError(Error, store, "getAttributes", [{}]);
			}
			store.fetch({
				query:{q:"Alabama"},
				onComplete: d.getTestCallback(onComplete)
			});
			return d; //Object
		}