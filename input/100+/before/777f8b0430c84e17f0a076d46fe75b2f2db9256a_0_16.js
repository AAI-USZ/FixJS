function onComplete1(items, request) {
					t.assertEqual(5, items.length);
					// Compare the hash of the last request, they must be different,
					// since another server request was issued.
					t.assertTrue(lastRequestHash!=store.lastRequestHash);
					t.assertEqual(store.getValue(firstItems[5], "name"), store.getValue(items[0], "name"));
					t.assertEqual(store.getValue(firstItems[6], "name"), store.getValue(items[1], "name"));
					t.assertEqual(store.getValue(firstItems[7], "name"), store.getValue(items[2], "name"));
					t.assertEqual(store.getValue(firstItems[8], "name"), store.getValue(items[3], "name"));
					t.assertEqual(store.getValue(firstItems[9], "name"), store.getValue(items[4], "name"));
					d.callback(true);
				}