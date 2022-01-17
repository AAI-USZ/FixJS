function( method, model, options ) {
            var headers = '';

            if ( TastyPie.apiKey && TastyPie.apiKey.username.length ) {
                headers = _.extend( {
                    'Authorization': 'ApiKey ' + TastyPie.apiKey.username + ':' + TastyPie.apiKey.key
                }, options.headers );
                options.headers = headers;
            }

            if ( ( method === 'create' && TastyPie.doGetOnEmptyPostResponse ) ||
                 ( method === 'update' && TastyPie.doGetOnEmptyPutResponse ) ) {
                var dfd = new $.Deferred();

                // Set up 'success' handling
                dfd.done( options.success );
                options.success = function( resp, status, xhr ) {
                    // If create is successful but doesn't return a response, fire an extra GET.
                    // Otherwise, resolve the deferred (which triggers the original 'success' callbacks).
                    if ( !resp && ( xhr.status === 201 || xhr.status === 202 || xhr.status === 204 ) ) { // 201 CREATED, 202 ACCEPTED or 204 NO CONTENT; response null or empty.
                        var location = xhr.getResponseHeader( 'Location' ) || model.id;
                        return $.ajax( {
                            url: location,
                            headers: headers,
                            success: dfd.resolve,
                            error: dfd.reject
                        });
                    }
                    else {
                        return dfd.resolveWith( options.context || options, [ resp, status, xhr ] );
                    }
                };

                // Set up 'error' handling
                dfd.fail( options.error );
                options.error = function( xhr, status, resp ) {
                    dfd.rejectWith( options.context || options, [ xhr, status, resp ] );
                };

                // Make the request, make it accessibly by assigning it to the 'request' property on the deferred
                dfd.request = Backbone.sync(method, model, options);
                return dfd;
            }

            return Backbone.sync( method, model, options );

        }