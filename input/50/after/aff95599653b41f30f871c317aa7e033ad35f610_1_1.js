function() {

			expect(function() {commands.register('mockCommand', {})}).toThrow();

		}