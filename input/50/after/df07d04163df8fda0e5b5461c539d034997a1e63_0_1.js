function(service, params, data) {
      var id = this._getCommunicationId();
      return this._communicate(service, params, "PUT", id, data);
    }