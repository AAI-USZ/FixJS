function onComplete(items, request){
				var item = items[0];
				// The good case(s).
				t.assertEqual(['id', 'name', 'label', 'abbreviation', 'capital'], store.getAttributes(item));
				t.assertError(Error, store, "getAttributes", [{}]);
			}