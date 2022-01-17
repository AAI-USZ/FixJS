function(token)
    {
        var _this = this;
        var previous_requests = {};

        /**
         * Makes a signed API request. Cancels all existing requests to the same endpoint.
         * @param  string   endpoint     The endpoint to call
         * @param  object   params       Key-value pair of paramaters to pass
         * @param  callable lambda       Function to execute on success, taking response data
         * @param  callable error_lambda Function to execute on error, taking error code
         * @param  [string] type         Optional type of the request (e.g. 'POST', 'GET', 'PATCH', etc.). Defaults to GET.
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
         * @param  string   obj          Object type to get
         * @param  string   key          Key value to get by
         * @param  object   params       Key-value pair of values to add/update
         * @param  callable lambda       Function to execute on success, takes data
         * @param  callable error_lambda Function to execute on failure, takes error code
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
         * @param  string   obj          Object type to get
         * @param  string   key          Key value to get by
         * @param  callable lambda       Function to execute on success, takes data
         * @param  callable error_lambda Function to execute on failure, takes error code
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
         * @param  string   obj          Object type to get
         * @param  string   key          Key value to get by
         * @param  callable lambda       Function to execute on success, takes data
         * @param  callable error_lambda Function to execute on failure, takes error code
         */
        this.get_object_by_key = function(obj, key, lambda, error_lambda)
        {
            _staticApi.get_object_by_key(obj, key, lambda, error_lambda);
        }

        /**
         * Gets an object by its secondary key; signed
         * @param  string   obj          Object type to get
         * @param  string   secondary    Name of the secondary key to search by
         * @param  string   key          Key value to get by
         * @param  callable lambda       Function to execute on success, takes data
         * @param  callable error_lambda Function to execute on failure, takes error code
         */
        this.get_object_by_secondary_key = function(obj, secondary, key, lambda, error_lambda)
        {
            _staticApi.get_object_by_secondary_key(obj, secondary, key, lambda, error_lambda);
        }
    }