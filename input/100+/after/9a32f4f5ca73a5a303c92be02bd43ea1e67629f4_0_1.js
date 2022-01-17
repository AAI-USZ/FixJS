function() {
        var waitForResultNotification = false;
        var result = {};

        function prepareResult(token) {
            result[token] = {
                childNodes: null,
            };
            return token;
        }
        return {
            log: function(message) {
                console.log(message);
            },
            querySingleton: function(type, block) {
                return prepareResult('querySingleton(' + type + ', ' + block + ')');
            },
            queryByUid: function(type, uid, block) {
                return prepareResult('queryByUid(' + type + ',' + uid + ', ' + block + ')');
            },
            query: function(type, block) {
                return prepareResult('query(' + type + ', ' + block + ')');
            },
            queryUids: function(type, block) {
                return prepareResult('queryUids(' + type + ', ' + block + ')');
            },
            queryCount: function(type, block) {
                return prepareResult('queryCount(' + type + ', ' + block + ')');
            },
            updateSingletonField: function(type, fieldName, fieldValue, block) {
                return prepareResult('updateSingletonField(' + type + ',' + fieldName + ',' + fieldValue + ', ' + block + ')');
            },
            updateField: function(type, uid, fieldName, fieldValue, block) {
                return prepareResult('updateField(' + type + ',' + uid + ',' + fieldName + ',' + fieldValue + ', ' + block + ')');
            },
            updateSingleton: function(type, entity, block) {
                return prepareResult('updateSingleton(' + type + ',' + entity + ', ' + block + ')');
            },
            update: function(type, uid, entity, block) {
                return prepareResult('update(' + type + ',' + uid + ',' + entity + ', ' + block + ')');
            },
            insert: function(type, uid, entity, block) {
                return prepareResult('insert(' + type + ',' + uid + ',' + entity + ', ' + block + ')');
            },
            remove: function(type, uid, block) {
                return prepareResult('remove(' + type + ',' + uid + ', ' + block + ')');
            },
            runSingleton: function(type, operationName, data, block) {
                return prepareResult('runSingleton(' + type + ',' + operationName + ',' + data + ', ' + block + ')');
            },
            run: function(type, operationName, data, block) {
                return prepareResult('run(' + type + ',' + operationName + ',' + data + ', ' + block + ')');
            },
            setWaitingForResultNotification: function(tf) {
                waitForResultNotification = tf;
            },
            // Not a public method, just for testing.
            isWaitingForResultNotification: function() {
                return waitForResultNotification;
            },
            commit: function(commitState, methodBlock) {
                var ret = result;
                result = {};
                return ret;
            },
            notifySync: function(entity, methodBlock) {
                if (typeof(entity) != 'object') {
                    throw 'The value must be an object.';
                }
                return {};
            },
            notifyAsync: function(entity) {
                if (typeof(entity) != 'object') {
                    throw 'The value must be an object.';
                }
                return {};
            },
            fetchUrlSync: function(url, params, methodBlock) {
                if (url.indexof('http:') == 0 || url.indexof('https:') == 0) {
                    return {};
                } else {
                    throw "Unsupported protocol scheme. URL=" + url;
                }
            },
        }
    }