function () {

                var params = $(editorId).keyvalueeditor('getValues');

                var newParams = [];

                for (var i = 0; i < params.length; i++) {

                    var param = {

                        key:params[i].key,

                        value:params[i].value

                    };



                    newParams.push(param);

                }



                postman.currentRequest.setUrlParamString(newParams);

            }