function( context ) {
            var instance = util.create( context );

            _.addGuid( instance );

            // Mixin events
            Stapes.mixinEvents( instance );

            return instance;
        }