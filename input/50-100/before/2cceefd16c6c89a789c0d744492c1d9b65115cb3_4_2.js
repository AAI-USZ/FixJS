function (service, action, args) {
                var result;

                execFunc(function (data, response) {
                    result = data;
                }, function (data, response) {
                    throw data;
                }, service, action, args, true);

                return result;
            }