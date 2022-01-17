function onComplete(items, request) {
				t.assertEqual(5, items.length);
				lastRequestHash = store.lastRequestHash;
				firstItems = items;
				
				// Do the next request AFTER the previous one, so we are sure its sequential.
				// We need to be sure so we can compare to the data from the first request.
				function onComplete1(items, request) {
					t.assertEqual(5, items.length);
					t.assertEqual(lastRequestHash, store.lastRequestHash);
					t.assertEqual(firstItems[1], items[0]);
					d.callback(true);
				}
				req.start = 1;
				req.onComplete = onComplete1;
				store.fetch(req);
			}