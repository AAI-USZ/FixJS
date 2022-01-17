function(stream) {
    return this._(stream, success, failure);

    function success(stream, result) {
      if (stream) return Parser.expected('EOF', stream, failure);

      return result;
    }
    function failure(stream, message) {
      throw 'Parse Error: ' + message;
    }
  }