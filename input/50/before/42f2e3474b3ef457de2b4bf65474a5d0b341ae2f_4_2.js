function (spec) {
				when(spec.store,
					function (store) {
						assert(store instanceof RestStore);
						done();
					},
					never(done)
				);
			}