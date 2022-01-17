function testReadApi_fetch_onBegin_ClientsidePaging(t){
			// summary:
			//		Simple test of fetching items, checking that onBegin size is all items matched, and page is just the items asked for.
			var store = dojox.data.tests.stores.QueryReadStore.getStore();
			store.doClientPaging = true;

			var d = new doh.Deferred();
			function onBegin(size, request){
				t.assertEqual(9, size);
			}
			function onComplete(items, request) {
				t.assertEqual(5, items.length);
			}
			function onError(error, request) {
				throw new Error(error);
			}
			store.fetch({
				query:{q:"m*"},
				start: 0,
				count: 5,
				onBegin: d.getTestErrback(onBegin),
				onComplete: d.getTestCallback(onComplete),
				onError: d.getTestErrback(onError)
			});
			return d; //Object
		}