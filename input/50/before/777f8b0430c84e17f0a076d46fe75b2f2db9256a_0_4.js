function onComplete(items, request) {
				t.assertEqual(12, items.length);
				d.callback(true);
			}