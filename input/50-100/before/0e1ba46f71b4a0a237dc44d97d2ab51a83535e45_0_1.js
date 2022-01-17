function pygmentize(args, callback) {
  if (!Array.isArray(args)) {
    args = args
      .split(' ')
      .filter(function (arg) {
        return arg.trim().length > 0;
      });
  }

  var pygmentizeReq = {
      task: 'pygmentize'
    , args: args
  };

  request(pygmentizeReq, callback);
}