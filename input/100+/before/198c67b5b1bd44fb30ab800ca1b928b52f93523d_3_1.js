function scan(source) {
  var tokens = [];
  var line = 1;
  var i = 0;

  //source = source.replace(/(\n|\r)+/g, '\n');

  while (i < source.length) {
    var chunk = source.slice(i, source.length);
    var value = null;
    
    // Keywords and identifiers
    if ((value = chunk.match(/[a-z]\w*/)) && value.index === 0) {
      value = value[0];
      if (logic.indexOf(value) >= 0) {tokens.push(['LOGIC', value, line]);}
      else if (keywords.indexOf(value) >= 0) {tokens.push([value.toUpperCase(), value, line]);}
      else {tokens.push(["IDENT", value, line]);}
      i = i + value.length;
    }
    // Constants
    else if ((value = chunk.match(/[A-Z]\w*/)) && value.index === 0) {
      value = value[0];
      tokens.push(["CONST", value, line]);
      i = i + value.length;
    }
    // Grammatical symbols
    else if ((value = chunk.match(/\(|\)|\,/)) && value.index === 0) {
      value = value[0];
      if (value == '(') {tokens.push(['LPAREN', value, line]);}
      else if (value == ')') {tokens.push(['RPAREN', value, line]);}
      else if (value == ',') {tokens.push(['COMMA', value, line]);}
      i = i + value.length;
    }
    // Operators
    else if ((value = chunk.match(/\=|>\=|<\=|>|<|\=\=|&&|\|\||\+|\-|\/|\*/)) && value.index === 0) {
      value = value[0];
      if (assign.indexOf(value) >= 0) {tokens.push(['ASSIGN', value, line]);}
      else if (logic.indexOf(value) >= 0) {tokens.push(['LOGIC', value, line]);}
      else if (math.indexOf(value) >= 0) {tokens.push(['MATH', value, line]);}
      else if (comparators.indexOf(value) >= 0) {tokens.push(['COMP', value, line]);}
      i = i + value.length;
    }
    // Numbers
    else if ((value = chunk.match(/[0-9]+(\.[0-9]+)?/)) && value.index === 0) {
      value = value[0];
      tokens.push(["NUMBER", Number(value), line]);
      i = i + value.length;
    }
    // Strings
    else if ((value = chunk.match(/"(.*?)"/)) && value.index === 0) {
      value = value[0];
      tokens.push(["STRING", value, line]);
      i = i + value.length;
    }
    // Newlines
    else if ((value = chunk.match(/(\n|\r)+/)) && value.index === 0) {
      value = value[0];
      tokens.push(["NEWLINE", value, line]);
      line = line + value.length;
      i = i + value.length;
    }
    else {
      //console.error("Unmatched: " + escape(value[0]));
      i = i + 1;
    }
  }
  return tokens;
}