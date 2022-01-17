function ( position ) {
            var output = [],
                slugs = window.location.href.split('/');
            for ( var slug in slugs  ) {
                if ( slugs[ slug ] !== '' ) {
                    output.push( slugs[ slug ] );
                }    
            }
            
            if ( position ) {
                if ( position === 'first' ) {
                    output = output[0];
                } if ( position === 'last' ) {
                    output = output[ output.length - 1 ];    
                }
            } 

            return output;
        }