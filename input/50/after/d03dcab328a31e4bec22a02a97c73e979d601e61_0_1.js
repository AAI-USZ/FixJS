function( name ) {

            name || ( name = "default" );
            this._animation[ name ].play( this );

        }