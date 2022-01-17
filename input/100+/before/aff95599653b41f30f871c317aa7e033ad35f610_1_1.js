function() {



	describe('when registering a new command', function() {

		it('should throw when not command is provided', function() {

			expect(function() { commands.register(undefined, {url: '/foo'})}).toThrow();

			expect(function() { commands.register('', {url: '/foo'})}).toThrow();

		});



		it('should throw when no options are provided', function() {

			expect(function() {commands.register('mockCommand')}).toThrow();

		});



		it('should throw when options object does not contain a url property', function() {

			expect(function() {commands.register('mockCommand', {})}).toThrow();

		});



		it('should set default jQuery Ajax options for type to GET', function() {

			var command = buildCommand();

			expect(command.options.type).toBe('GET');

		});



		it('should set default jQuery Ajax options for dataType to JSON', function() {

			var command = buildCommand();

			expect(command.options.dataType).toBe('JSON');

		});



		it('should create a new property on window.commands for given key', function() {

			buildCommand('_test_key_');

			expect(commands._test_key_).not.toBeUndefined();

		});

	});



}