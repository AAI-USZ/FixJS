function(err) {

                if(err == undefined) {

                    // define how the business process show respond in case of success

                    msg = messageResponses.response("<document><id>12345</id></document>");

                }

                else {

                    // define how the business process show respond in case of failure

                    msg = messageResponses.response("<document><error>didn't save</error></document>");

                }

        }