function () {  
        callback.apply(socket, arguments);
        $rootScope.$apply();
      }