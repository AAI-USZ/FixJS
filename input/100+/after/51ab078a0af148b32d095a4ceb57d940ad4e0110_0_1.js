function() {

    function NotFoundError(msg) {
      this.name = 'NotFoundError';
      Error.call(this, msg);
      Error.captureStackTrace(this, arguments.callee);
      this.render = function(req, res) {
          if (req.is('json')) {
              res.json({ reason:"Page Not Found", status:404 }, 404);
              return;
          }
          res.render('not_found', {
            title:"Page Not Found",
            status: 404
          });
      };
    }
        
    NotFoundError.prototype.__proto__ = Error.prototype;    
    
    exports.NotFoundError = NotFoundError;
    
    function SecureError(msg) {
      this.name = 'SecureError';
      Error.call(this, msg);
      Error.captureStackTrace(this, arguments.callee);
      this.render = function(req, res) {
          if (req.is('json')) {
              res.json({ reason:"Permission Denied", status:403 }, 403);
              return;
          }
        res.render('permission_denied', {
          title:"Permission Denied",
          status: 403
        });
      }
    }
    
    SecureError.prototype.__proto__ = Error.prototype;    
    
    exports.SecureError = SecureError;

    function UnauthorizedError(msg) {
      this.name = 'UnauthorizedError';
      Error.call(this, msg);
      Error.captureStackTrace(this, arguments.callee);
      this.render = function(req, res) {
          if (req.is('json')) {
              res.json({ reason:"Unauthorized", status:401 }, 401);
              return;
          }          
        res.render('unauthorized', {
          title:"Unauthorized",
          status: 401
        });
      }
    }
    
    UnauthorizedError.prototype.__proto__ = Error.prototype;    
    
    exports.UnauthorizedError = UnauthorizedError;


    function ModuleDisabledError(msg) {
      this.name = 'ModuleDisabledError';
      Error.call(this, msg);
      Error.captureStackTrace(this, arguments.callee);
      this.render = function(req, res) {
          if (req.is('json')) {
              res.json({ reason:"Module Denied", status:503 }, 503);
              return;
          }
        res.render('module_disabled', {
          title:"Module Denied",
          status: 503
        });
      }
    }

    ModuleDisabledError.prototype.__proto__ = Error.prototype;    
    
    exports.ModuleDisabledError = ModuleDisabledError;
    
    function ApplicationUnavailableError(msg) {
      this.name = 'ApplicationUnavailableError';
      Error.call(this, msg);
      Error.captureStackTrace(this, arguments.callee);
      this.render = function(req, res) {
          if (req.is('json')) {
              res.json({ reason:"Application Unavailable", status:503 }, 503);
              return;
          }
          
        res.render('application_unavailable', {
          title:"Application Unavailable",
          status: 503
        });
      }
    }
    
    ApplicationUnavailableError.prototype.__proto__ = Error.prototype;    
    
    exports.ApplicationUnavailableError = ApplicationUnavailableError;
    
}