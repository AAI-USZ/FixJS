function(stream, onSuccess, onFailure) {
    if (!stream.length) return CharParser.expected(ch, stream, onFailure);

    var head = stream.charAt(0);
    if (cond(head)) {
      return onSuccess(stream.slice(1), head);
    }
    else {
      return CharParser.expected(ch, stream, onFailure);
    }
  }