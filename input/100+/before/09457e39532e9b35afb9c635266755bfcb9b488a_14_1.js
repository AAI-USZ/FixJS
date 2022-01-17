function handleText(stream, mdState) {
    var match;
    if (stream.match(/^\w+:\/\/\S+/)) {
      return 'linkhref';
    }
    if (stream.match(/^[^\[*\\<>` _][^\[*\\<>` ]*[^\[*\\<>` _]/)) {
      return mdMode.getType(mdState);
    }
    if (match = stream.match(/^[^\[*\\<>` ]+/)) {
      var word = match[0];
      if (word[0] === '_' && word[word.length-1] === '_') {
        stream.backUp(word.length);
        return undefined;
      }
      return mdMode.getType(mdState);
    }
    if (stream.eatSpace()) {
      return null;
    }
  }