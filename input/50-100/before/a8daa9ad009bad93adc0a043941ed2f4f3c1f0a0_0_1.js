function(stream, onSuccess, onFailure) {
    if (!stream.length) return onFailure(stream);

    var head = stream.charAt(0);
    if (cond(head)) {
      return onSuccess(stream.slice(1), head);
    }
    else {
      return onFailure(stream, ch);
    }
  }