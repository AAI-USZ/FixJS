function testReadApi_fetch_one(t){
			// summary:
			// description:
			var store = dojox.data.tests.stores.QueryReadStore.getStore();
			
			var d = new doh.Deferred();
			function onComplete(items, request){
				t.assertEqual(1, items.length);
				d.callback(true);
			}
			function onError(error, request) {
				d.errback(error);
			}
			store.fetch({query:{q:"Alaska"}, onComplete: onComplete, onError: onError});
			return d; //Object
		}