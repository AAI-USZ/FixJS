function(Log, Event, JQuery, Config, Async, Util){
    var _staticApi = function(token)
    {
        var _this = this;
        var previous_requests = {};

        /**
         * Makes a signed API request. Cancels all existing requests to the same endpoint.
         * @param  {string}                             endpoint     The endpoint to call
         * @param  {Object.<string,string|number>}      params       Key-value pair of paramaters to pass
         * @param  {function(Object.<string, string>)}  lambda       Function to execute on success, taking response data
         * @param  {function(string)}                   error_lambda Function to execute on error, taking error code
         * @param  {string=}                            type         Optional type of the request (e.g. 'POST', 'PATCH'). Defaults to GET.
         */
        this.call = function(endpoint, params, lambda, error_lambda, type)
        {
            if (typeof(params) === 'string') {
                params += '&token=' + token + '&';
            } else if(typeof(params) === 'object') {
                params['token'] = token;
            }

            return _staticApi.call(endpoint, params, lambda, error_lambda, type);
        }

        /**
         * Updates an object by its primary key; signed
         * @param  {string}                             obj          Object type to get
         * @param  {string}                             key          Key value to get by
         * @param  {Object.<string,string|number>}      params       Key-value pair of values to add/update
         * @param  {function(Object.<string, string>)}  lambda       Function to execute on success, taking response data
         * @param  {function(string)}                   error_lambda Function to execute on error, taking error code
         */
        this.update_object_by_key = function(obj, key, params, lambda, error_lambda)
        {
            Log('debug', 'Updating ' + key + '.', params);

            //Requires a token
            this.call(('update/' + obj + '/' + key), params, function(data){
                Log('debug', 'Update response: ', data.data);
                lambda(data.data);
            }, error_lambda, 'post');
        }

        /**
         * Deletes an object by its primary key; signed
         * @param  {string}                             obj          Object type to delete
         * @param  {string}                             key          Key value to delete by
         * @param  {function(Object.<string, string>)}  lambda       Function to execute on success, taking response data
         * @param  {function(string)}                   error_lambda Function to execute on error, taking error code
         */
        this.delete_object_by_key = function(obj, key, params, lambda, error_lambda)
        {
            //Requires a token
            this.call(('delete/' + obj + '/' + key), params, function(data){
                Log('debug', 'Delete response: ', data.data);
                lambda(data.data);
            }, error_lambda, 'post');
        }

        /**
         * Gets an object by its primary key; signed
         * @param  {string}                             obj          Object type to get
         * @param  {string}                             key          Key value to get by
         * @param  {function(Object.<string, string>)}  lambda       Function to execute on success, taking response data
         * @param  {function(string)}                   error_lambda Function to execute on error, taking error code
         */
        this.get_object_by_key = function(obj, key, lambda, error_lambda)
        {
            _staticApi.get_object_by_key(obj, key, lambda, error_lambda);
        }

        /**
         * Gets an object by its secondary key; signed
         * @param  {string}                             obj          Object type to get
         * @param  {string}                             secondary    Name of the secondary key to search by
         * @param  {string}                             key          Key value to get by
         * @param  {function(Object.<string, string>)}  lambda       Function to execute on success, taking response data
         * @param  {function(string)}                   error_lambda Function to execute on error, taking error code
         */
        this.get_object_by_secondary_key = function(obj, secondary, key, lambda, error_lambda)
        {
            _staticApi.get_object_by_secondary_key(obj, secondary, key, lambda, error_lambda);
        }

        /**
         * Posts a comment to the stream
         * @param  {string}                             stream_id    Stream ID
         * @param  {string}                             comment      Comment text
         * @param  {function(Object.<string, string>)}  lambda       Function to execute on success, taking response data
         * @param  {function(string)}                   error_lambda Function to execute on error, taking error code
         */
        this.post_comment_to_streamid = function(stream_id, comment, lambda, error_lambda)
        {
            var streamObject = {
                streamid: stream_id,
                text: comment
            };
            var id = Util.randomString(50);


            _this.update_object_by_key('comment', id, streamObject, lambda, error_lambda);
        }
    }

    /**
     * Stores previous XHTTPRequest objects to cancel them if we redo a call
     * @type {Object.<string,Object>}
     * @private
     */
    var previous_requests = {};

    /**
     * Method to call when any API exception occurs.
     * @type {Event}
     */
    _staticApi.onApiError = new Event();

    /**
     * Makes an unsigned API request. Cancels all existing requests to the same endpoint.
     * @param  {string}                             endpoint     The endpoint to call
     * @param  {Object.<string,string|number>}      params       Key-value pair of paramaters to pass
     * @param  {function(Object.<string, string>)}  lambda       Function to execute on success, taking response data
     * @param  {function(string)}                   error_lambda Function to execute on error, taking error code
     * @param  {string=}                            type         Optional type of the request (e.g. 'POST', 'PATCH'). Defaults to GET.
     */
    _staticApi.call = function(endpoint, params, lambda, error_lambda, type) {
        if (typeof(type) !== 'string') {
            type = 'get';
        }

        if (error_lambda === true) {
            error_lambda = function(err) {
                Log('warn', 'API call failed, but retrying...', err, endpoint, params, lambda, type);
                Async.later(2000, function(){
                    _staticApi.call(endpoint, params, lambda, error_lambda, type);
                });
            };
        } else if (typeof(error_lambda) !== 'function') {
            error_lambda = function(){};
        }

        if (endpoint in previous_requests) {
            previous_requests[endpoint].abort();
        }

        var conf = {
            url: Config['api']['base'] + endpoint,
            dataType: 'json',
            type: type,
            success: function(data) {
                lambda(data);
            },
            error: function(s, error) {
                error_lambda(error);
                _staticApi.onApiError.apply(error);
            }
        };

        if (type.toLowerCase() !== 'get') {
            conf['data'] = params;
        } else {
            var _params = params;
            if (typeof(params) === 'object')
            {
                params = "";
                for (var i in _params) {
                    params = params + _params[i] + '&';
                }
            }
            conf['url'] += '?' + params;
        }

        var xhttp = JQuery.ajax(conf);

        previous_requests[endpoint] = xhttp;
        return xhttp;
    }

    /**
     * Gets a list of streams for the current view.
     * @param  {number}                             north        Top latitude
     * @param  {number}                             east         Right longitude
     * @param  {number}                             south        Bottom latitude
     * @param  {number}                             west         Left longitude
     * @param  {number}                             start        Start time
     * @param  {number}                             end          End time
     * @param  {function(Object.<string, string>)}  lambda       Function to execute on success, taking response data
     * @param  {function(string)}                   error_lambda Function to execute on error, taking error code
     */
    _staticApi.get_streams_by_location = function(north, east, south, west, start, end, lambda, error_lambda)
    {
        var params = 'topleft=' + north +
                     '&topleft=' + east +
                     '&bottomright=' + south +
                     '&bottomright=' + west +
                     '&start=' + start +
                     '&end=' + end;

        _staticApi.call('get/streambylocation', params, function(data){
            lambda(data.data.streams);
        }, error_lambda);
    }

    /**
     * Logs the user in.
     * @param  {string}                             username     Username to use
     * @param  {string}                             password     Password to use (plain text)
     * @param  {function(Object.<string, string>)}  lambda       Function to execute on success, taking response data
     * @param  {function(string)}                   error_lambda Function to execute on error, taking error code
     */
    _staticApi.login = function(username, password, lambda, error_lambda)
    {
         var params = 'username=' + username + '&password=' + password

         //This will return a token if login succeeded
        _staticApi.call('login', params, function(data){
            Log('debug', 'response data:', data.data);
            mixpanel.track('login');
            lambda(data);
        }, error_lambda, 'post')
    }

    /**
     * Registers a user.
     * @param  {string}                             username     Username to request
     * @param  {string}                             password     Password to associate with the user
     * @param  {function(Object.<string, string>)}  lambda       Function to execute on success, taking response data
     * @param  {function(string)}                   error_lambda Function to execute on error, taking error code
     */
    _staticApi.register = function(username, password, lambda, error_lambda)
    {
         var params = 'username=' + username + '&password=' + password

         //This will return a token
        _staticApi.call('register', params, function(data){
            mixpanel.track('register');
            Log('debug', 'response data:', data.data);
            lambda(data);
        }, error_lambda, 'post')
    }

    /**
     * Gets an object by its primary key; unsigned
     * @param  {string}                             obj          Object type to get
     * @param  {string}                             key          Key value to get by
     * @param  {function(Object.<string, string>)}  lambda       Function to execute on success, taking response data
     * @param  {function(string)}                   error_lambda Function to execute on error, taking error code
     */
    _staticApi.get_object_by_key = function(obj, key, lambda, error_lambda)
    {
         var params = null

        _staticApi.call(('get/' + obj + "/" + key), params, function(data){
            Log('debug', 'response data:', data);
            lambda(data);
        }, error_lambda)
    }

    /**
     * Gets an object by its secondary key; unsigned
     * @param  {string}                             obj          Object type to get
     * @param  {string}                             secondary    Name of the secondary key to search by
     * @param  {string}                             key          Key value to get by
     * @param  {function(Object.<string, string>)}  lambda       Function to execute on success, taking response data
     * @param  {function(string)}                   error_lambda Function to execute on error, taking error code
     */
    _staticApi.get_object_by_secondary_key = function(obj, secondary, key, lambda, error_lambda)
    {
         var params = null

        _staticApi.call(('get/' + obj + "by" + secondary + "/" + key), params, function(data){
            Log('debug', 'response data:', data);
            lambda(data);
        }, error_lambda)
    }

    /**
     * Gets comments associated with a specific stream.
     * @param  {string}                             streamID     The ID of the stream to get
     * @param  {function(Object.<string, string>)}  lambda       Function to execute on success, taking response data
     * @param  {function(string)}                   error_lambda Function to execute on error, taking error code
     */
    _staticApi.get_comments_by_streamid = function(stream_id, lambda, error_lambda)
    {
        _staticApi.get_object_by_secondary_key('comment', 'streamid', stream_id, lambda, error_lambda);
    }

    /**
    * Gets a stream's time and location details
     * @param  {string}                             streamID     The ID of the stream to get
     * @param  {function(Object.<string, string>)}  lambda       Function to execute on success, taking response data
     * @param  {function(string)}                   error_lambda Function to execute on error, taking error code
    */
    _staticApi.get_timestream_by_stream_id = function(id, lambda, error_lambda)
    {
        return _staticApi.get_object_by_secondary_key('timestream', "streamid", id, lambda, error_lambda);
    }

    /**
     * Gets a stream by its id.
     * @param  {string}                             id           ID of the stream
     * @param  {function(Object.<string, string>)}  lambda       Function to execute on success, taking response data
     * @param  {function(string)}                   error_lambda Function to execute on error, taking error code
     */
    _staticApi.get_stream_by_stream_id = function(id, lambda, error_lambda)
    {
        return _staticApi.get_object_by_key('stream', id, lambda, error_lambda);
    }

    return _staticApi;
}