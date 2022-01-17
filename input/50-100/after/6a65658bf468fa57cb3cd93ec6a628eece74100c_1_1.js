function() {
  'use strict';

  errors.NotFound = function(msg) {
      this.name = 'NotFound';
      Error.call(this, msg);
      Error.captureStackTrace(this);

      // remove the part of the stack trace referencing
      // this module.
      this.stack = this.stack.split('\n');
      this.stack.splice(1, 1);
      this.stack = this.stack.join('\n');
  };
}