function ( uri, callback ) {
        var type = 'get'
          , len
          , options = {}
          , qparams = _.clone( params )
          , self = this
          , emitter = new EventEmitter();
        
        // if nothing specified, then bark at the user :-)
        if( !uri ) {
            throw new Error( Errors.INVALID_URL );
        }

        // uri is an array then the request type must be POST
        // in order to send multiple URLs to verify to Google
        if( Array.isArray( uri ) ) {
            type = 'post';

            log( 'Request type: POST' );

            // check max number of urls
            if( uri.length > MAX_NUMBER_OF_URLS_ALLOWED ) {
                throw new Error( Errors.MAX_URLS_ALLOWED );
            }

            // sort the array 
            uri.sort();

            // discard invalid urls
            var parsedUrls = uri.filter( function ( u ) {
                return ( u && isValidURL( u ) ? u : undefined );
            } );

            if( !parsedUrls.length ) {
                throw new Error( Errors.NO_URL_TO_LOOKUP );
            }

            // discard duplicate items
            parsedUrls = _.unique( parsedUrls, true /* isSorted */ );

            // length needs to be sent to the request body
            // as per API requirement
            parsedUrls.unshift( parsedUrls.length );

            options.uri = buildQueryStringURL( qparams );
            options.body = parsedUrls.join( '\n' );

            log( 'Request URI:\n %s', options.uri );
            log( 'Request Body:\n %s', options.body );

            log( 'Total URLs to look up after processing: %d', parsedUrls[0] );
        }


        // GET requests
        if( type == 'get' ) {
            log( 'Request type: GET' );

            // check URL validness
            if( !isValidURL( uri ) ) {
                throw new Error( Errors.INVALID_URL );
            }

            qparams.url = uri;
            options.uri = buildQueryStringURL( qparams );

            log( 'URL to be looked up: %s', options.uri );
        }

        // Make the request
        log( 'Sending request to Google...' );
        request[type]( options, responseCallback );


        // ==== Utility inner functions ====

        /**
         * Utility method to check for URL validity
         * @param u
         */
        function isValidURL( u ) {
            var o = url.parse(u);
            return !!(o.protocol && o.hostname );
        }

        /**
         * Utility method to generate the GET URL for lookup
         * @param u
         * @param params
         */
        function buildQueryStringURL( params ) {
            return ( GOOGLE_API_URL + '?' + qs.stringify( params ) );
        }

        /**
         * Internal callback method for the HTTP Request
         * @param error
         * @param response
         * @param body
         */
        function responseCallback( error, response, body ) {
            var data;

            log('Response Status: %d', response.statusCode );
            log('Raw Response Body: %s', body );

            function callbackOrEvent( event, args ) {
                if( _.isFunction( callback ) ) {
                    if( event == 'error' ) {
                        callback( args );
                    } else {
                        callback( null, args );
                    }
                } else {
                    emitter.emit( event, args );    
                }
            }

            if( error ) {
                return callbackOrEvent( 'error', error );
            }
            
            // the Google Safe Browsing API returns the following response codes
            // for invalid requests which can be considered as Errors
            // 400, 401, 503

            // indexOf uses Strict Matching(===), hence parseInt()
            if( [400, 401, 503 ].indexOf( parseInt( response.statusCode, 10 ) ) > -1 ) {
                return callbackOrEvent( 'error', new APIResponseError(response.statusText, response.statusCode ) );
            } else {
                // assume it's 200 or 204
                data = prepareData( response, body );
                callbackOrEvent( 'success', data );
            }

            log( 'Finished.' );
        }


        /**
         * Utility function to parse the response body. It returns an object literal
         * with the the URLs as key and api response as values, so that it's easier
         * to figure out which url is a bad one.
         *
         * Output:
         *
         * response = { statusCode: HTTP_RESPONSE_CODE, data: {...URLs} }
         *
         * @param response
         * @param body
         */
        function prepareData( response, body ) {
            var statusCode = response.statusCode,
                retVal = {
                    statusCode: statusCode,
                    data: {}
                },
                results;

            if( type == 'get' ) {
                results = 'ok';

                // if 200 then see the response body for the exact type i.e malware|fishing|malware,fishing
                if( statusCode == 200 ) {
                    results = body.replace(/\n|\r\n/, '' );
                }

                retVal['data'][uri] = results;

            } else {
                // the first element in parsedUrls array is the
                // total number of URLs, we need to shift that out
                parsedUrls.shift();

                // NONE of the specified URLs matched, all clean!
                if( statusCode == 204 ) {
                    parsedUrls.forEach( function ( value, index ) {
                        retVal['data'][value] = 'ok';
                    } );
                }
                // AT LEAST ONE of the specified URLs matched
                else {
                    results = body.split('\n');

                    results.forEach( function ( value, index ) {
                        retVal['data'][ parsedUrls[index] ] = value;
                    } );
                }
            }
            return retVal;
        }

        return emitter; // for event binding
    }