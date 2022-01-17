function repl() {
  // always disable on production
  if(process.env.NODE_ENV == "production")
    return function(req, res, next) { next(); };

  if(!context) {
    context = require('repl').start("REPL> ").context;
    context.stop = false;
    setEmptyNext();
  }
  return function(req, res, next) {
    if(!context)
      return next();

    if(context.stop) {
      context.stop = false;
      context.req = req;
      context.res = res;
      console.log("Request stopped, call next() to continue");
      context.next = function() {
        //don't know why setEmptyNext cannot be called immediatelly. It's a V8 bug or feature? :-)
        process.nextTick(setEmptyNext);
        console.log("Going on!");
        next.apply(null, arguments);
      };
      // do not call next(), this should do user in REPL
    } else {
      context.last_req = req;
      context.last_res = res;
      next();
    }
  }
}