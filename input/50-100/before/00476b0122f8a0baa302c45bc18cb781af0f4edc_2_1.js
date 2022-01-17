function runReplacements(word, table) {
    var matched = false;
    table.forEach(function(inflection) {
      if(!matched && word.match(inflection.rule)) {
        word = word.replace(inflection.rule, inflection.replacement);
        matched = true;
      }
    });
    return word;
  }