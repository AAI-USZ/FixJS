function onComplete(items, request){
				var item = items[0];
				// The good cases.
				t.assertEqual(["Alabama"], store.getValues(item, "name"));
				t.assertEqual(["<img src='images/Alabama.jpg'/>Alabama"], store.getValues(item, "label"));
				t.assertEqual(["AL"], store.getValues(item, "abbreviation"));
				// TODO Test for null somehow ...
				// Read api says: Returns null if and only if null was explicitly set as the attribute value.

				// Test for not-existing attributes without defaultValues and invalid items.
				// TODO
				t.assertEqual([], store.getValues(item, "NOT THERE"));
				var errThrown = false;
				try{
					//Should throw an exception.
					var values = store.getValues("not an item", "NOT THERE");
				}catch (e){
					errThrown = true;
				}
				t.assertTrue(errThrown);
			}