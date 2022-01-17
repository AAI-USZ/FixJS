function(command) {
    var args = Array.prototype.slice.apply(arguments);
    var deferred = $q.defer();
    ss.rpc.apply(ss, [command].concat(args.slice(1,args.length-1)).concat(function(response) {
      $rootScope.$apply(function() {
        deferred.resolve(response);
      });
    }));
    return deferred.promise;
  }