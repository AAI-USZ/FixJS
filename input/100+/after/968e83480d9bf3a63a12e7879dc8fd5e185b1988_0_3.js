function() {
    it('should log an error if updating a link fails', function() {
      var message = 'Database error updating resolved link for ID x',
          code = 500,
          error = 'Some error';

      spyOn(db, 'addNewLinkHit').andCallFake(function() {
        return helper.rejectAPromise({
          message: message,
          error: error,
          code: code
        });
      });

      r.resolveURL({
        url: url,
        client: client,
        userAgent: userAgent
      }).then(notCalled, spy);

      expect(spy).toHaveBeenCalledWith(message, code);
      expect(notCalled).not.toHaveBeenCalled();

      expect(logging.log).not.toHaveBeenCalled();
      expect(logging.error).toHaveLogged({
        message: message,
        error: error,
        code: code
      });
    });
  }