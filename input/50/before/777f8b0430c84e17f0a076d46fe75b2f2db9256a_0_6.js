function onComplete(items, request) {
				t.assertEqual(5, items.length);
				if(passed){
					d.callback(true);
				}else{
					d.errback(new Error("Store did not return proper number of rows, regardless of page size"));
				}
			}