function() {
      r.resolveURL({
        url: invalidUrl,
        client: client,
        userAgent: userAgent
      }).then(notCalled, spy);

      expect(db.logActivity).not.toHaveBeenCalled();
      expect(db.logError).toHaveLogged({
        message: 'Missing or invalid URI',
        url: invalidUrl,
        client: client,
        code: 404
      });
    }