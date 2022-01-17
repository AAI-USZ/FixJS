function() {
      spyOn(db, 'addNewLinkHit').andCallFake(function() {
        return helper.rejectAPromise({
          message: message,
          error: error,
          code: 404
        });
      });

      r.resolveURL({
        url: url,
        client: client,
        userAgent: userAgent
      }).then(notCalled, spy);

    }