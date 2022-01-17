function save(callback) {

        var service = this._service,
            id = this._id,
            self = this;

        callback = callback || noop;

        if (!service) {
            log.error('(alamid) Cannot save model: There is no service available.');
            return;
        }

        if (id === null || typeof id === "undefined") {
            service.create(this.Instance, onServiceResponse);
        } else {
            service.update(this.Instance, onServiceResponse);
        }

        function onServiceResponse(response) {
            var err;
            try {
                err = self.__processResponse(response);
            } catch (err) {
                err.message = "(alamid) Error while updating the model: " + err.message;
            }
            if (!err) {
                self.Super.emit("save");
            }
            callback(err);
        }

    }