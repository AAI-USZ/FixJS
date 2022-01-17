function (param) { 
            if (param.data.clientRequestID != lastId) {
                index = 0;
                lastId = param.data.clientRequestID;
            }

            setTimeout(function () {
                var success = (Math.floor(Math.random() * 11) != 10);
                param.complete(null, (success ? 'Success' : 'Fail'));
                if (success)
                    param.success(generate(param.data));
            }, 300);
        }