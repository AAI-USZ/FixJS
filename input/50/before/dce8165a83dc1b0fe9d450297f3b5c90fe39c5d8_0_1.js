function(stream, onSuccess, onFailure) {
    if (!stream.length) return onFailure(stream, 'any character');

    return onSuccess(stream.slice(1), stream.charAt(0));
  }