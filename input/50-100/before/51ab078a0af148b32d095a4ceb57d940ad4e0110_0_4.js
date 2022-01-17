function ApplicationUnavailableError(msg) {
      this.name = 'ApplicationUnavailableError';
      Error.call(this, msg);
      Error.captureStackTrace(this, arguments.callee);
      this.render = function(req, res) {
        res.render('application_unavailable', {
          title:"Application Unavailable",
          status: 503
        });
      }
    }