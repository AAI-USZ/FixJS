function() {

			var command = buildCommand();

			expect(command.options.type).toBe('GET');

		}