function(req, res, callback) {

    try {

        var app = req.app;

        var logger = app.logger;

        logger.log('info', 'Adding item to queue', '');

        var queueProvider = app.getQueueProvider();



        queueProvider.save({ "message": app.body.json ,"raw": app.body.raw}, function(error, docs) {



            if(error != null) {

                return callback(error);

            }

            else {

                logger.log('info', 'Item saved', error);

                return "saved";

            }



        });



        return callback(null, "addtoqueue");

    }

    catch(err) {

       return callback(err);

    }

}