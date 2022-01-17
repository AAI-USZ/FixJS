function(stream) {
    return this._(stream, success, parseError);

    function success(stream, result) {
      if (stream) parseError(stream, 'EOF');

      return result;
    }
  }