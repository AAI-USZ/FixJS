function testReadApi_isItem(t){
			// summary:
			// description:
			var store = dojox.data.tests.stores.QueryReadStore.getStore();
			
			var d = new doh.Deferred();
			function onComplete(items, request){
				// The good case.
				t.assertEqual(true, store.isItem(items[0]));
				// Try a pure object.
				t.assertEqual(false, store.isItem({}));
				// Try to look like an item.
				t.assertEqual(false, store.isItem({name:"Alaska", label:"Alaska", abbreviation:"AK"}));
				d.callback(true);
			}
			store.fetch({query:{q:"Alaska"}, onComplete: onComplete});
			return d; //Object
		}