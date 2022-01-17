function( model ) {
                var parts = _.compact( model.id.split( '/' ) );
                return parts[ parts.length - 1 ];
            }