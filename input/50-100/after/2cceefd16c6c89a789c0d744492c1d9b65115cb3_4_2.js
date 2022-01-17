function (extBasename, action, args) {
                var result;

                execFunc(function (data, response) {
                    result = data;
                }, function (data, response) {
                    throw data;
                }, extBasename, action, args, true);

                return result;
            }