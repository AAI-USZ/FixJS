function testReadApi_hasAttribute(t){
			var store = dojox.data.tests.stores.QueryReadStore.getStore();
			
			var d = new doh.Deferred();
			function onComplete(items, request){
				var item = items[0];
				// The positive cases.
				t.assertEqual(true, store.hasAttribute(item, "name"));
				t.assertEqual(true, store.hasAttribute(item, "label"));
				t.assertEqual(true, store.hasAttribute(item, "abbreviation"));
				// Make sure attribute case doesnt matter.
				t.assertEqual(false, store.hasAttribute(item, "NAME"));
				t.assertEqual(false, store.hasAttribute(item, "Name"));
				t.assertEqual(false, store.hasAttribute(item, "Label"));
				// Pass in an invalid item.
				t.assertEqual(false, store.hasAttribute({}, "abbreviation"));
				// pass in something that looks like the item with the attribute.
				t.assertEqual(false, store.hasAttribute({name:"yo"}, "name"));
			}
			store.fetch({
				query:{q:"Alaska"},
				onComplete: d.getTestCallback(onComplete)
			});
			return d; //Object
		}