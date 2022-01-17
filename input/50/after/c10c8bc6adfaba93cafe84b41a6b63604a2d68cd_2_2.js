function success(newStream, result) {
        var newParser = two(result);
        pray('a parser is returned', newParser instanceof Parser);
        return newParser._(newStream, onSuccess, onFailure);
      }