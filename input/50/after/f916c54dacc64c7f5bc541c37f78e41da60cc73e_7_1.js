function(err) {

                if(err == undefined) {

                    // define how the business process show respond in case of success

                    msg = "<document><id>12345</id></document>";

                }

                else {

                    // define how the business process show respond in case of failure

                    msg = "<document><error>didn't save</error></document>";

                }



                console.log(msg)



                return callback(null, msg);

            }