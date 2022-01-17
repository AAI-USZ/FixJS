function() {
      spyOn(transform, 'uriToLinkID').andCallThrough();
      spyOn(db, 'addNewLinkHit').andCallFake(function() {
        return helper.resolveAPromise(longLink);
      });
    }