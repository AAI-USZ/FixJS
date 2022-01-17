function onComplete1(items, request) {
					t.assertEqual(5, items.length);
					t.assertEqual(lastRequestHash, store.lastRequestHash);
					t.assertEqual(firstItems[1], items[0]);
					d.callback(true);
				}