function constraintName(tokens) {

            var token = trim(tokens.shift());

            var result = validStartingCharacter(token.charAt(0));



            if (result.successful) {

                var i = 1;

                while (i < token.length && result.successful) {

                    result = validCharacter(token.charAt(i));

                    i++;

                }



                if (result.successful) {

                    result.data = token;

                }

            }



            else {

                result = {

                    successful:false,

                    message:generateErrorMessage(element, currentConstraintName, "Invalid starting character for constraint name. Can only include A-Z, a-z, and _") + " " + result.message,

                    data:null

                };

            }





            return result;

        }