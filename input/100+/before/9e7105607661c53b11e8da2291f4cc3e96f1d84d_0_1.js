function ( prefix, options ) {
        var routes = {};

        // Prefix is optional, set to empty string if not passed
        this.prefix = prefix = prefix || "";

        // Allow for optionally omitting trailing /.  Since base routes do not
        // trigger with a trailing / this is actually kind of important =)
        if ( prefix.substr( -1 ) != "/" ) {
            prefix = prefix + '/';
        }

        // Every route needs to be prefixed
        _.each( this.routes, function ( callback, path ) {
            if ( path ) {
                routes[prefix + path] = callback;
            } else {
                // If the path is "" just set to prefix, this is to comply
                // with how Backbone expects base paths to look gallery vs gallery/
                routes[prefix.substr( 0, prefix.length - 1 )] = callback;
            }
        } );

        // Must override with prefixed routes
        this.routes = routes;

        // Required to have Backbone set up routes
        Backbone.Router.prototype.constructor.call( this, options );

        // grab the full URL
        var hash = Backbone.history.getHash();

        // check if there is already a part of the URL that this subview cares about...
        var hashPart = hash.substr( prefix.length, hash.length );

        // ...if so, trigger the subroute immediately.  this supports the case where 
        // a user directly navigates to a URL with a subroute on the first page load.
        if ( hashPart && hashPart != "" ) {
            Backbone.history.loadUrl( prefix + hashPart );
        }
    }