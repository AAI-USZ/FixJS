function to a command', function() {

		var command = buildCommand(),

			s = function() { },

			e = function() { },

			a = function() { };

		it('should set s as the success function', function() {

			command.success( s );

			expect( command.success ).toEqual( s );

		});



		it('should set e as the error function', function() {

			command.error( e );

			expect( command.error ).toEqual( e );

		});



		it('should set a as the always function', function() {

			command.always( a );

			expect( command.always ).toEqual( a );

		});

	}