function() {
      r.resolveURL({
        client: client,
        userAgent: userAgent
      }).then(notCalled, spy);

      expect(logging.log).not.toHaveBeenCalled();
      expect(logging.error).toHaveLogged({
        message: 'Missing or invalid URI',
        url: undefined,
        client: client,
        code: 404
      });
    }