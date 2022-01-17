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