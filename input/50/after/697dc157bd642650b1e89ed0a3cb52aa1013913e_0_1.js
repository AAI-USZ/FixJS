function success(stream, result) {
      if (stream) parseError(stream, 'expected EOF');

      return result;
    }