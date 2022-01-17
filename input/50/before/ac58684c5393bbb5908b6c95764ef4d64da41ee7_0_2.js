function(request, response, next){
      if (request.method === method && request.pathname === route) {
        callback(request, response, next);
      } else {
        next();
      }
    }