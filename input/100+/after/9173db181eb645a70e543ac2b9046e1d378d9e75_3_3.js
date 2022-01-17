function (query) {
        var args = arguments, args_length = args.length, i, query_array,
            query_array_length, querystring = this, key_value;

        if (args_length == 1) {
            if (typeof query === 'object') {
                // iterate
                for (i in query) {
                    if (query.hasOwnProperty(i)) {
                        querystring[i] = query[i];
                    }
                }
            } else if (typeof query === 'string') {
                // split string on '&'
                query_array = query.split('&');
                // iterate over each of the array items
                for (i = 0, query_array_length = query_array.length; i < query_array_length; i++) {
                    // split on '=' to get key, value
                    key_value = query_array[i].split('=');
                    querystring[key_value[0]] = key_value[1];
                }
            }
        } else {
            for (i = 0; i < args_length; i += 2) {
                // treat each arg as key, then value
                querystring[args[i]] = args[i+1];
            }
        }
    }