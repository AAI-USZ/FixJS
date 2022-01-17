function()

	{

		phoenix.setClearColor( color(0.0, 0.0, 0.0, 1) );

		phoenix.setVSync( true );

		

		modules.use( '.controls', true, true );

		exec( 'ship' );

		exec( 'shot' );

		exec( 'alien' );

		

		playership = new Ship( phoenix.resolution.x/2, phoenix.resolution.y-50 );

		

		addAliens();

	}