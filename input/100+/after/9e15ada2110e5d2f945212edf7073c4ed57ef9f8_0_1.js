function Engine(options, callback) {
    if (!(this instanceof Engine)) {
        return new Engine(options, callback);
    }

    var self = this;
    self.options = options || {};
    self._services = {};

    this._updateSvcList(callback);
}