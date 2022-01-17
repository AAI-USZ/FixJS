function() {
      r.resolveURL({
        url: invalidUrl,
        client: client,
        userAgent: userAgent
      }).then(notCalled, spy);

      expect(logging.log).not.toHaveBeenCalled();
      expect(logging.error).toHaveLogged({
        message: 'Missing or invalid URI',
        url: invalidUrl,
        client: client,
        code: 404
      });
    }