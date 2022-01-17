function parseError(stream, expected) {
    if (!stream) stream = 'EOF';
    else stream = '"' + stream + '"';
    throw 'Parse Error: expected ' + expected + ', got ' + stream;
  }