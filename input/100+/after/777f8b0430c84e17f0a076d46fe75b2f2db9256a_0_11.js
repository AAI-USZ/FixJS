function testReadApi_fetch_onBegin_ServersidePaging(t){
			// summary:
			//		Simple test of fetching items, checking that onBegin size is all items matched, and page is just the items asked for.
			var store = dojox.data.tests.stores.QueryReadStore.getStore();

			var d = new doh.Deferred();
			var began = false;
			function onBegin(size, request){
				t.assertEqual(9, size);
				began = true;
			}
			function onComplete(items, request) {
				t.t(began, "onBegin was called");
				t.assertEqual(4, items.length);	// 9 total, starting at 5, 4 left.
			}
			function onError(error, request) {
				throw new Error(error);
			}

			store.fetch({
				query:{q:"m*"},
				start: 5,
				count: 5,
				onBegin: d.getTestErrback(onBegin),
				onComplete: d.getTestCallback(onComplete),
				onError: d.getTestErrback(onError)
			});
			return d; //Object
		}