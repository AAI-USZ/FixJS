function testReadApi_fetch_all(t){
			// summary:
			//		Simple test of fetching all items.
			var store = dojox.data.tests.stores.QueryReadStore.getStore();

			var d = new doh.Deferred();
			function onComplete(items, request) {
				t.assertEqual(9, items.length);
			}
			function onError(error, request) {
				throw new Error(error);
			}
			store.fetch({
				query:{q:"m*"},
				onComplete: d.getTestCallback(onComplete),
				onError: d.getTestErrback(onError)
			});
			return d; //Object
		}