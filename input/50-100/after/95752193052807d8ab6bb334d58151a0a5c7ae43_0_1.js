function (error, session) {
        if (!error) {
          request.session = session;
        }
        
        var resource = Guard.Resource.fromRequest(request);
        guard.authorize(resource, request.session, callback);
      }