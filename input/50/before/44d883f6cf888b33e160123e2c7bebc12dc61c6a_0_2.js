function success(stream, result) {
      if (stream) parseError(stream, 'EOF');

      return result;
    }