function constraintDef(tokens) {

            var alias = {

                Between:"Range",

                Matches:"Pattern",

                Empty:"Blank",

                NotEmpty:"NotBlank",

                IsAlpha:"Alpha",

                IsNumeric:"Integer",

                IsAlphaNumeric:"AlphaNumeric"

            };



            var result = constraintName(tokens);



            if (result.successful) {

                currentConstraintName = result.data;



                currentConstraintName = alias[currentConstraintName] ? alias[currentConstraintName] : currentConstraintName;



                if (constraintsMap[currentConstraintName]) {

                    result = paramDef(tokens);



                    if (result.successful) {

                        result = validateConstraintDefinition(element, currentConstraintName, result.data);



                        if (result.successful) {

                            createConstraintFromDefinition(element, currentConstraintName, result.data);

                        }

                    }

                }



                else {

                    result = {

                        successful:false,

                        message:generateErrorMessage(element, currentConstraintName, "I cannot find the specified constraint name. If this is a custom constraint, you need to define it before you bind to it") + " " + result.message,

                        data:null

                    };

                }

            }



            else {

                result = {

                    successful:false,

                    message:generateErrorMessage(element, currentConstraintName, "Invalid constraint name in constraint definition") + " " + result.message,

                    data:null

                };

            }



            return result;

        }