function NotFoundError(msg) {
      this.name = 'NotFoundError';
      Error.call(this, msg);
      Error.captureStackTrace(this, arguments.callee);
      this.render = function(req, res) {
          res.render('not_found', {
            title:"Page Not Found",
            status: 404
          });
      }
    }