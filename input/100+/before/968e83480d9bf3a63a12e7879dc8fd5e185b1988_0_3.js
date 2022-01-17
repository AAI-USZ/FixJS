function() {
    it('should log an error if updating a link fails', function() {
      var message = 'Database error updating resolved link for ID x',
          code = 500,
          error = 'Some error';

      spyOn(db, 'addNewLinkHit').andCallFake(function() {
        return rejectAPromise({
          message: message,
          error: error,
          code: code
        });
      });

      spyOn(db, 'logActivity').andCallFake(function() { return resolveAPromise() });
      spyOn(db, 'logError').andCallFake(function() { return resolveAPromise() });

      r.resolveURL({
        url: url,
        client: client,
        userAgent: userAgent
      }).then(notCalled, spy);

      expect(spy).toHaveBeenCalledWith(message, code);
      expect(notCalled).not.toHaveBeenCalled();

      expect(db.logActivity).not.toHaveBeenCalled();
      expect(db.logError).toHaveLogged({
        message: message,
        error: error,
        code: code
      });
    });

    it('should log an error if logging activity fails', function() {
      var message = 'Database error writing to the activity log',
          code = 500,
          error = 'Some error',
          longLink = 'http://google.com';

      spyOn(db, 'addNewLinkHit').andCallFake(function() {
        return resolveAPromise(longLink);
      });

      spyOn(db, 'logActivity').andCallFake(function() {
        return rejectAPromise({
          message: message,
          error: error,
          code: code
        });
      });
      spyOn(db, 'logError').andCallFake(function() { return resolveAPromise() });

      r.resolveURL({
        url: url,
        client: client,
        userAgent: userAgent
      }).then(notCalled, spy);


      expect(db.logActivity).toHaveBeenCalled();
      expect(db.logError).toHaveLogged({
        message: message,
        error: error,
        code: code
      });
    });

    it('should throw an error if logging an error fails', function() {
      var message = 'Database error writing to the activity log',
          code = 500,
          error = 'Some error',
          longLink = 'http://google.com',
          errStr = 'Could not write to error log';;

      spyOn(db, 'addNewLinkHit').andCallFake(function() {
        return resolveAPromise(longLink);
      });

      spyOn(db, 'logActivity').andCallFake(function() {
        return rejectAPromise({
          message: message,
          error: error,
          code: code
        });
      });
      spyOn(db, 'logError').andCallFake(function() {
        return rejectAPromise({
          message: errStr,
          error: error,
          code: code
        });
      });

      expect(function() {
        r.resolveURL({
          url: url,
          client: client,
          userAgent: userAgent
        }).then(notCalled, spy);
      }).toThrow(errStr);
    });
  }