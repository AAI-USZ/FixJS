function onComplete(items, request){
				var item = items[0];
				t.assertTrue(store.containsValue(item, "name", "Alaska"));
			}