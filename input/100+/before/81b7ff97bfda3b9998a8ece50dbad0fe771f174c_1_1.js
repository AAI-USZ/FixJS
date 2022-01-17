function Router(){
    var self = this;
    this.handlers = {};
    for (var i=0; i < methods.length; i++) {
      this.handlers[methods[i]] = [];
    }

    this.on('request',function(request, callback){

      var request = new Request(request);
      var response = new Response(callback);
      var listeners = self.handlers[request.method];

      if (listeners && listeners.length) {
        var index = -1;
        void function next(){
          if (++index < listeners.length) {
            listeners[index](request, response, next);
          } else {
            response.send(500, 'Internal Server Error');
          }
        }();
      } else {
        response.send(500, 'Internal Server Error');
      }
    });
    return this;
  }