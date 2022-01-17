function( res ) {
              deepEqual( res, {
                email: butter.cornfield.user(),
                name: butter.cornfield.user(),
                username: butter.cornfield.user()
              }, "Response contains user information" );
              start();
            }