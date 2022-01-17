function defGroup(open, close) {
    if (!(tokens[open] != null)) {
      defToken(open);
      defToken(close);
      groupOpens[open] = close;
      return groupCloses[close] = 1;
    }
  }