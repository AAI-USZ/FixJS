function onComplete1(items, request) {
					t.assertEqual(5, items.length, "length of second fetch");
					t.assertEqual(lastRequestHash, store.lastRequestHash, "lastRequestHash");
					t.assertEqual(firstItems[1], items[0], "items[0]");
				}