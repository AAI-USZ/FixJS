function(done) {
		wire({
			component: { module: './test/node/fixtures/object' }
		}).then(
			function(context) {
				var component = context.component;

				// Ensure that create thru ready happen in order, and that
				// destroy does not happen
				assert.equals(component.lifecycle, steps.slice(0, steps.length-3));

				// Ensure that destroy happens and is always last
				context.destroy().then(
					function() {
						assert.equals(component.lifecycle, steps);
					},
					fail
				).then(done, done);
			},
			fail
		);
	}