function (error, session) {
        if (error) {
          logger.error ('Invalid session');
        }
        else {
          request.session = session;
        }
        
        var resource = Guard.Resource.fromRequest(request);
        guard.authorize(resource, request.session, callback);
      }