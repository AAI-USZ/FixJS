function(req, res, callback) {

    try {

        var app = req.app;

        var logger = app.logger;

        var queueProvider = app.getQueueProvider();

        var msg;



        logger.log('info', 'Adding item to queue', '');



        queueProvider.save({ "message": app.body.json, "raw": app.body.raw }, function(error, docs) {



            if(error == undefined) {

                msg = messageResponses.simpleResponse("OK");

            }

            else {

                msg = messageResponses.simpleResponse("FAIL:" +error);

            }





            return callback(null, msg);

        });



    }

    catch(err) {

        return callback(err);

    }

}