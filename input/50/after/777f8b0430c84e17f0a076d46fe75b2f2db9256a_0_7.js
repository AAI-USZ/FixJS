function onComplete(items, request) {
				t.t(began, "onBegin was called");
				t.assertEqual(4, items.length);	// 9 total, starting at 5, 4 left.
			}