function() {
    var self = this;
    
    self.jsonCall = function(url, successCallback, errorCallback) {
      $.getJSON(url, function(data) {
        successCallback(data);
      }).error(function(jqXHR) {
        errorCallback($.parseJSON(jqXHR.responseText));
      });
    }

    self.all = function(successCallback, errorCallback) {
      jsonCall("/monitors", successCallback, errorCallback);
    }

    self.findById = function(id, successCallback, errorCallback) {
      jsonCall('/monitors/' + id, successCallback, errorCallback);
    }

    return {
      all: all,
      findById: findById,
    }
  }