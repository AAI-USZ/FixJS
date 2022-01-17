function(error, docs) {

            if(error != null) {

                return callback(error);

            }

            else {

                return callback(null, docs[0].raw);

            }



        }