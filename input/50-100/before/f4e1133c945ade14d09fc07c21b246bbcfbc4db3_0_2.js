function(group, rest) {
        return [group(Nil, str.length - rest.length), null, rest];
      }