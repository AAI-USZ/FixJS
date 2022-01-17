function testReadApi_fetch_onBegin(t){
			// summary:
			//		Simple test of fetching items, checking that onBegin size is all items matched, and page is just the items asked for.
			// description:
			//		Simple test of fetching items, checking that onBegin size is all items matched, and page is just the items asked for.
			var store = dojox.data.tests.stores.QueryReadStore.getStore();

			var d = new doh.Deferred();
			var passed = false;
			function onBegin(size, request){
				t.assertEqual(12, size);
				passed = true;
			}
			function onComplete(items, request) {
				t.assertEqual(5, items.length);
				if(passed){
					d.callback(true);
				}else{
					d.errback(new Error("Store did not return proper number of rows, regardless of page size"));
				}
			}
			function onError(error, request) {
				d.errback(error);
			}
			store.fetch({query:{q:"m"}, start: 0, count: 5, onBegin: onBegin, onComplete: onComplete, onError: onError});
			return d; //Object
		}