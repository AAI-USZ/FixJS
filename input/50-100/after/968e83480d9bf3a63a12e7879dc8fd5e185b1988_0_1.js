function() {
      spyOn(db, 'addNewLinkHit').andCallFake(function() {
        return helper.resolveAPromise(longLink);
      });

      spyOn(transform, 'uriToLinkID').andCallThrough();

      r.resolveURL({
        url: url,
        client: client,
        userAgent: userAgent
      }).then(spy, notCalled);
    }