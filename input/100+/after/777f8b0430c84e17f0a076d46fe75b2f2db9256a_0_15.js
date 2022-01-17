function testReadApi_fetch_client_paging(t){
			// summary:
			//		Let's test that paging on the same request does not trigger
			//		server requests.
			var store = dojox.data.tests.stores.QueryReadStore.getStore();
			store.doClientPaging = true;

			var lastRequestHash = null;
			var firstItems = [];
			var d = new doh.Deferred();
			function onComplete(items, request) {
				t.assertEqual(5, items.length, "length of first fetch");
				lastRequestHash = store.lastRequestHash;
				firstItems = items;
				
				// Do the next request AFTER the previous one, so we are sure its sequential.
				// We need to be sure so we can compare to the data from the first request.
				function onComplete1(items, request) {
					t.assertEqual(5, items.length, "length of second fetch");
					t.assertEqual(lastRequestHash, store.lastRequestHash, "lastRequestHash");
					t.assertEqual(firstItems[1], items[0], "items[0]");
				}
				req.start = 1;
				req.onComplete = d.getTestCallback(onComplete1);
				store.fetch(req);
			}
			function onError(error, request) {
				throw new Error(error);
			}
			var req = {
				query:{q:"m*"},
				start:0,
				count:5,
				onComplete: d.getTestErrback(onComplete),
				onError: d.getTestErrback(onError)
			};

			store.fetch(req);
			return d; //Object
		}