function () {

            var data;

            var mode = postman.currentRequest.body.mode;

            var params;

            var newParams;

            var param;

            var i;



            if (mode === "params") {

                params = $('#formdata-keyvaleditor').keyvalueeditor('getValues');

                newParams = [];

                for (i = 0; i < params.length; i++) {

                    param = {

                        key:params[i].key,

                        value:params[i].value

                    };



                    newParams.push(param);

                }

                data = postman.currentRequest.getBodyParamString(newParams);

            }

            else if (mode === "raw") {

                data = $('#body').val();

            }

            else if (mode === "urlencoded") {

                params = $('#urlencoded-keyvaleditor').keyvalueeditor('getValues');

                newParams = [];

                for (i = 0; i < params.length; i++) {

                    param = {

                        key:params[i].key,

                        value:params[i].value

                    };



                    newParams.push(param);

                }

                data = postman.currentRequest.getBodyParamString(newParams);

            }



            return data;

        }