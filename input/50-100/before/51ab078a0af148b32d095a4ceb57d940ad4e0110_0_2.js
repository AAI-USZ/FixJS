function SecureError(msg) {
      this.name = 'SecureError';
      Error.call(this, msg);
      Error.captureStackTrace(this, arguments.callee);
      this.render = function(req, res) {
        res.render('permission_denied', {
          title:"Permission Denied",
          status: 503
        });
      }
    }