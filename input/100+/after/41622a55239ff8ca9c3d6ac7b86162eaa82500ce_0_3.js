function param(tokens) {

            var result = paramName(tokens);



            if (result.successful) {

                var parameterName = result.data;

                var token = tokens.shift();



                if (token == "=") {

                    result = paramValue(tokens);



                    if (result.successful) {

                        result.data = {

                            name:parameterName,

                            value:result.data

                        };

                    }



                    else {

                        result = {

                            successful:false,

                            message:generateErrorMessage(element, currentConstraintName, "Invalid parameter value") + " " + result.message,

                            data:null

                        };

                    }

                }



                else {

                    tokens.unshift(token);

                    result = {

                        successful:false,

                        message:generateErrorMessage(element, currentConstraintName, "'=' expected after parameter name" + " " + result.message),

                        data:null

                    };

                }

            }



            else {

                result = {

                    successful:false,

                    message:generateErrorMessage(element, currentConstraintName, "Invalid parameter name. You might have unmatched parentheses") + " " + result.message,

                    data:null

                };

            }



            return result;

        }