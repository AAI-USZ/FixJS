function success(stream, result) {
      if (stream) return Parser.expected('EOF', stream, failure);

      return result;
    }