function(expected, stream, onFailure) {
    if (!stream) stream = 'EOF';
    else stream = '"' + stream + '"';
    return onFailure(stream, 'expected ' + expected + ', got ' + stream);
  }