function(text) {
    for(var emotic in patterns) {
      text = text.replace(patterns[emotic],emoticHTML.replace("$emotic", emotic));
    }
    return text;
  }