function() {
      r.resolveURL({
        client: client,
        userAgent: userAgent
      }).then(notCalled, spy);

      expect(db.logActivity).not.toHaveBeenCalled();
      expect(db.logError).toHaveLogged({
        message: 'Missing or invalid URI',
        url: undefined,
        client: client,
        code: 404
      });
    }