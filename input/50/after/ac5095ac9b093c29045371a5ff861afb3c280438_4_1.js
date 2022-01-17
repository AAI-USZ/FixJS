function(uncountable) {
      return new regexp('\\b' + uncountable + '$', 'i').test(word);
    }