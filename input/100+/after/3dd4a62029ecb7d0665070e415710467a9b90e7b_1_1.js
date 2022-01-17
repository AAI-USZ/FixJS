function (data) {
            if (data) {
                for (var prop in data) {
                    if (!data.hasOwnProperty(prop)) {
                        continue;
                    }
                    if (data[prop] == null) {
                        delete data[prop];
                    }
	                // We need to stringify the data items passed in since ti.cloud allows the
	                // caller to pass json objects in for the values rather than being restricted
	                // to string values. Therefore we need to convert objects to strings here.
                    if (typeof(data[prop]) == 'object') {
                        // Check that we haven't received a blob or file.
	                    // [MOD-817] -- don't check for empty dictionary string "{}" of the stringified value
	                    if (prop == com.acs.constants.photo || prop == com.acs.constants.file) {
		                    continue;
	                    }
                        // Otherwise, carry on with the stringification!
                        data[prop] = JSON.stringify(data[prop]);
                    }
                    // If we receive a boolean, convert it to the equivalent integer. This helps Oauth behave itself.
                    if (data[prop] === true || data[prop] === false) {
                        data[prop] = data[prop] ? 1 : 0;
                    }
                }
                return data;
            } else {
                return {};
            }
        }