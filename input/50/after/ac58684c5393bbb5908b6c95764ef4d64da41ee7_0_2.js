function(request, response, next){
      if (request.method.toLowerCase() === method && request.pathname === route) {
        callback(request, response, next);
      } else {
        next();
      }
    }