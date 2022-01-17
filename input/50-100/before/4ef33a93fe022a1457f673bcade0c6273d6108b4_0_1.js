function basicScan(str) {
      return ifParsed(this.parseGroup(str, '\n', str.length), function(group, rest) {
        return [group(Nil, str.length - rest.length), null, rest];
      });
    }