function to even the number of items between the view and the store", function () {
			expect(couchDBStore.actions.evenDocsInStore).toBeInstanceOf(Function);
		}