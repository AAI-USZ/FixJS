function onComplete(items, request){
				var item = items[0];
				// The good case(s).
				t.assertTrue(store.isItemLoaded(item));
				
				d.callback(true);
			}