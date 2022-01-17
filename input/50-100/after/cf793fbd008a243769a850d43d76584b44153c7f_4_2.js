function able(tokens, i, call){
  var token, tag;
  i == null && (i = tokens.length);
  tag = (token = tokens[i - 1])[0];
  return (tag == 'ID' || tag == ']' || tag == '?') || (call
    ? token.callable || (tag == ')' || tag == ')CALL') && token[1]
    : tag == '}}
