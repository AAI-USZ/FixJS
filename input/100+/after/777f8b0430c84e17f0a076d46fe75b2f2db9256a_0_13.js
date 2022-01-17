function testReadApi_fetch_one(t){
			var store = dojox.data.tests.stores.QueryReadStore.getStore();
			
			var d = new doh.Deferred();
			function onComplete(items, request){
				t.assertEqual(1, items.length);
			}
			function onError(error, request) {
				throw new Error(error);
			}
			store.fetch({
				query:{q:"Alaska"},
				onComplete: d.getTestCallback(onComplete),
				onError: d.getTestErrback(onError)
			});
			return d; //Object
		}