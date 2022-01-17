function onComplete(items, request){
				var item = items[0];
				// The good cases.
				t.assertEqual(["<img src='images/Alabama.jpg'/>Alabama"], store.getLabel(item));
				d.callback(true);
			}