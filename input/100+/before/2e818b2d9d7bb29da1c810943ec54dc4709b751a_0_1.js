function save(callback) {

//        var servicePath = this.Instance.constructor.url;
//
//        var service = services.getService(servicePath);
//
//        //fake objects for signature
//        var req = new Request(),
//            res = new Response();
//
//        //or update
//        service.create(this.Instance, req, res, callback);


        //apply acceptCurrentState according to schema definition (server/client)
        /*

        var service = this._service,
            self = this,
            id = this._id,
            method,
            model = this.toJSON();

        function onServiceResponse(code, response) {
            var err;

            //old
            //response = servicesAdapter[method](code, response);

            //we always translate the response according to jSend

            try {
                err = self.__processResponse(response);
            } catch (err) {
                err.message = "Error while updating the model: " + err.message;
            }
            if (!err) {
                self.Super.emit("save");
            }
            callback(err);
        }

        if (!service) {
            console.error('Cannot save model: There is no service available.');

            return;
        }
        callback = callback || noop;
        if (id === null || typeof id === "undefined") {
            method = 'POST';
            service.POST(model, onServiceResponse);
        } else {
            method = 'PUT';
            service.PUT(id, model, onServiceResponse);
        }
        */
    }