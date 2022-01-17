function(service, params) {
      var id = this._getCommunicationId();
      return this._communicate(service, params, "PUT", id, data);
    }