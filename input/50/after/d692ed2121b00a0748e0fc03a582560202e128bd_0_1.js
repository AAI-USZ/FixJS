function( context ) {
            var instance = util.create( context );

            _.addGuid( instance, true );

            // Mixin events
            Stapes.mixinEvents( instance );

            return instance;
        }