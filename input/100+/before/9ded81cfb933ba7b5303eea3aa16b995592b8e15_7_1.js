function (url, callback, options) {
        if (typeof url === 'undefined') {
            throw new DeveloperError('url is required.');
        }

        if (typeof callback === 'undefined') {
            throw new DeveloperError('callback is required.');
        }

        options = typeof options !== 'undefined' ? options : {};

        //generate a unique function name
        var functionName;
        do {
            functionName = 'jsonp' + Math.random().toString().substring(2, 8);
        } while (typeof window[functionName] !== 'undefined');

        //assign a function with that name in the global scope
        window[functionName] = function(data) {
            callback(data);

            try {
                delete window[functionName];
            } catch (e) {
                window[functionName] = undefined;
            }
        };

        var callbackParameterName = typeof options.callbackParameterName !== 'undefined' ? options.callbackParameterName : 'callback';
        var queryParts = [];
        pushQueryParameter(queryParts, callbackParameterName, functionName);

        var parameters = options.parameters;
        if (typeof parameters !== 'undefined') {
            for ( var name in parameters) {
                if (parameters.hasOwnProperty(name)) {
                    pushQueryParameter(queryParts, name, parameters[name]);
                }
            }
        }

        if (queryParts.length > 0) {
            if (url.indexOf('?') === -1) {
                url += '?';
            } else {
                url += '&';
            }

            url += queryParts.join('&');
        }

        var proxy = options.proxy;
        if (typeof proxy !== 'undefined') {
            url = proxy.getURL(url);
        }

        var script = document.createElement('script');
        script.async = true;
        script.src = url;

        var head = document.getElementsByTagName('head')[0];
        script.onload = function() {
            script.onload = undefined;
            head.removeChild(script);
        };

        head.appendChild(script);
    }