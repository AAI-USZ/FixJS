function pygmentize(args, code, callback) {
  if (!Array.isArray(args)) {
    args = args
      .split(' ')
      .filter(function (arg) {
        return arg.trim().length > 0;
      });
  }

  if (typeof code !== 'string') {
      callback = code;
      code = '';
  }

  var pygmentizeReq = {
      task: 'pygmentize'
    , args: args
    , code: code
  };

  request(pygmentizeReq, callback);
}