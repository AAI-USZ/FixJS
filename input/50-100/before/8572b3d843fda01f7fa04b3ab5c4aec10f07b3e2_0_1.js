function (next) {
      if (this.req.headers['x-auth-token'] === authToken) {
        next();
        return true;
      }

      haibu.sendResponse(this.res, 403, { message: 'Wrong auth token' });
      return false;
    }