function(response) {
      $rootScope.$apply(function() {
        deferred.resolve(response);
      });
    }