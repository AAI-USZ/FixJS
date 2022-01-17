function (next) {
      this.req.connection.setTimeout(haibu.config.get('service:timeout') || 60 * 1000 * 15);
      if (this.req.headers['x-auth-token'] === authToken) {
        next();
        return true;
      }

      haibu.sendResponse(this.res, 403, { message: 'Wrong auth token' });
      return false;
    }