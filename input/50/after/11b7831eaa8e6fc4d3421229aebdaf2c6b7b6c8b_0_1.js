function getLanguageFromFragment(fragment) {
    var match;

    fragment = fragment || "";

    if (!(match = /syn=(\w+)/.exec(fragment))) {
      return null;
    }

    return match[1];
  }