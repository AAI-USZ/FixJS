function() {
			var zoo = new Zoo();

			var indexes = [];

			zoo.get("animals").on("add", function(collection, model, options) {
				indexes.push(options.index);
			});

			zoo.set("animals", [
					new Animal({ id : 1, species : 'Lion' }),
					new Animal({ id : 2, species : 'Zebra'})
			]);

			equal( indexes[0], 0, "First item has index 0" );
			equal( indexes[1], 1, "Second item has index 1" );
		}