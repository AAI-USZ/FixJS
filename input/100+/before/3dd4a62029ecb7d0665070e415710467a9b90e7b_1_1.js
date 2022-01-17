function (data) {
            if (data) {
                for (var prop in data) {
                    if (!data.hasOwnProperty(prop)) {
                        continue;
                    }
                    if (data[prop] == null) {
                        delete data[prop];
                    }
                    // Check that we haven't received a blob or file.
                    if (typeof(data[prop]) == 'object') {
                        var stringified = JSON.stringify(data[prop]);
                        // Check if we've received a blob on iOS.
                        if (stringified == '{}') {
                            continue;
                        }
                        // Check if we've received a file.
                        if (data[prop].nativePath) {
                            continue;
                        }
                        // Otherwise, carry on with the stringification!
                        data[prop] = stringified;
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