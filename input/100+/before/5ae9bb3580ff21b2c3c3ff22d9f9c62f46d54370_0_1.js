function( httpMethod, uri, paramObj, credentials, options, callback ) {

        // Normalize arguments
        if ( _.isFunction( options )) {
            callback = options;
            options = {};
        }
        httpMethod = httpMethod.toUpperCase();
        uri = OAuth.normalizeUri( uri );

        var nonce       = OAuth.getNonce(),
            timestamp   = OAuth.getTimestamp(),
            parameters  = this._getParameters( paramObj, credentials.token, nonce, timestamp ),
            baseString  = this._createBaseString( httpMethod,  uri, parameters ),
            key         = this._createKey( credentials.tokenSecret ),
            signature   = OAuth.percentEncode( crypto.createHmac( "sha1", key ).update( baseString ).digest("base64") ),
            uriParts    = url.parse( uri ),
            isSecureUri = uriParts.protocol === "https:",
            boundary    = options.body && OAuth.getBoundary( options.body ),
            requestObj  = {
                host: uriParts.hostname,
                port: ( isSecureUri ? 443 : 80 ),
                path: [
                    uri.split( uriParts.hostname ).pop(), 
                    parameters
                ].join("?"),
                method: httpMethod,
                headers: _.extend({
                    "Authorization"     : this._getAuthorizationHeader( credentials.token, signature, timestamp, nonce ),
                    "Host"              : uriParts.hostname,
                    "Content-Length"    : options.body ? options.body.length : 0
                }, this.headers )
            },
            // This is used for debugging purposes
            oauthDetails = {
                nonce       : nonce,
                timestamp   : timestamp,
                parameters  : parameters,
                baseString  : baseString,
                key         : key,
                signature   : signature,
                uriParts    : uriParts,
                isSecureUri : isSecureUri,
                boundary    : boundary
            },
            request;



        // Create request
        request     = ( isSecureUri ? https : http ).request( requestObj, function ( response ) {

            var data;
            
            // If there's no callback, we dont have to do this stuff
            if ( callback ) {

                // This will hold the data chunks
                data = [];

                // UTF-8 FTW
                response.setEncoding('utf8');


                response.on('data', function ( chunk ) {
                    data.push( chunk );
                });

                response.on('end', function () {
                    data = data.join("");
                    if ( response.statusCode != 200 ) {
                        callback({
                            statusCode: response.statusCode,
                            oauth : oauthDetails
                        }, data, response);
                    } else {
                        callback( undefined, data, response );
                    }
                });
            }
        });

        // Write out the post or put body
        request.end( options.body, options.requestEncoding || "binary" );
    }