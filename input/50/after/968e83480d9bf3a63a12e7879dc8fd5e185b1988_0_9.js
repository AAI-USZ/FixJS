function() {
      spyOn(db, 'addNewLinkHit').andCallFake(function() {
        return helper.resolveAPromise(longLink);
      });

    }