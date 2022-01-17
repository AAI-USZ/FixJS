function defGroup(open, close) {
    console.log("DEFINING GROUP: " + open + ", " + close);
    if (!(tokens[open] != null)) {
      defToken(open);
      defToken(close);
      groupOpens[open] = close;
      return groupCloses[close] = 1;
    }
  }