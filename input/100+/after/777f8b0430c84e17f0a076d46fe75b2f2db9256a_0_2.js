function testReadApi_getValue(t){
			var store = dojox.data.tests.stores.QueryReadStore.getStore();
			
			var d = new doh.Deferred();
			function onComplete(items, request){
				var item = items[0];
				// The good cases.
				t.assertEqual("Alabama", store.getValue(item, "name"));
				t.assertEqual("<img src='images/Alabama.jpg'/>Alabama", store.getValue(item, "label"));
				t.assertEqual("AL", store.getValue(item, "abbreviation"));
				// Test the defaultValue cases (the third paramter).
				t.assertEqual("default value", store.getValue(item, "NAME", "default value"));
				// TODO Test for null somehow ...
				// Read api says: Returns null if and only if null was explicitly set as the attribute value.
				
				// According to Read-API getValue() an exception is thrown when
				// the item is not an item or when the attribute is not a string.
				t.assertError(Error, store, "getValue", ["not an item", "NOT THERE"]);
				t.assertError(Error, store, "getValue", [item, {}]);
			}
			store.fetch({
				query:{q:"Alabama"},
				onComplete: d.getTestCallback(onComplete)
			});
			return d; //Object
		}