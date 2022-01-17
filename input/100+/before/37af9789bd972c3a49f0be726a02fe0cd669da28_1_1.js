function()

	{

		phoenix.setClearColor( color(0.0, 0.0, 0.0, 1) );

		phoenix.setVSync( true );

		

		modules.use( '.controls', true, true );

		exec( 'ship' );

		exec( 'shot' );

		exec( 'alien' );

		

		playership = new Ship( phoenix.resolution.x/2, phoenix.resolution.y-50 );

		

		for( y = 50; y <= 110; y+=60 ) {

			for( x = 50; x <= phoenix.resolution.x -210; x+=60 ) {

				new Alien( x, y );

				enemy_count++;

			}

		}

	}