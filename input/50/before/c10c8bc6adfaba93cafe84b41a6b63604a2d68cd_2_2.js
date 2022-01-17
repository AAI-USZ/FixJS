function success(newStream, result) {
        return ensureParser(two(result))._(newStream, onSuccess, onFailure);
      }