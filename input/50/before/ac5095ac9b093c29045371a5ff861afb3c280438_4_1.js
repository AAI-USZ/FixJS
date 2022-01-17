function(uncountable) {
      return new RegExp('\\b' + uncountable + '$', 'i').test(word);
    }