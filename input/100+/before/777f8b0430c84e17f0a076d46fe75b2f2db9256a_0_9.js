function testReadApi_fetch_all(t){
			// summary:
			//		Simple test of fetching all items.
			// description:
			//		Simple test of fetching all items.
			var store = dojox.data.tests.stores.QueryReadStore.getStore();

			var d = new doh.Deferred();
			function onComplete(items, request) {
				t.assertEqual(12, items.length);
				d.callback(true);
			}
			function onError(error, request) {
				d.errback(error);
			}
			store.fetch({query:{q:"m"}, onComplete: onComplete, onError: onError});
			return d; //Object
		}