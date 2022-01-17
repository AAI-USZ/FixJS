function() {
    var self = this;

    self.all = function(successCallback, errorCallback) {
      $.getJSON('/monitors', function(data) {
        successCallback(data);
      }).error(errorCallback);
    }

    self.findById = function(id, successCallback, errorCallback) {
      $.getJSON('/monitors/' + id, function(data) {
        successCallback(data);
      }).error(errorCallback);
    }

    return {
      all: all,
      findById: findById,
    }
  }