function(request, callback){
      request.method = request.method.toLowerCase();
      var listeners = self.handlers[request.method];

      if (listeners && listeners.length) {
        var response = new Response(callback);
        var index = -1;
        request = new Request(request);
        void function next(){
          if (++index < listeners.length) {
            listeners[index](request, response, next);
          } else {
            response.send(500, 'Internal Server Error');
          }
        }();
      }
    }