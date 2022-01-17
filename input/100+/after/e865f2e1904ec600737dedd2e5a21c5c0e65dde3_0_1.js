function ( document, $, jsonTool ) {    
    var core = function () {};

    core.prototype.content = {
        toJson: function ( content ) {
            var output = JSON.stringify( {} );

            if ( content ) {
                output = JSON.stringify( content );
            }

            return output;
        },

        toHtml: function ( content ) {
            return jsonTool.create( content );
        }    
    };

    core.prototype.slug = {
        href: function ( position ) {
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
    };

    return new core;
}