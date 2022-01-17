function stateReplace (value) {
  var inString = false;
  var length = value.length;
  var position = 0;
  var escaped = false;

  var output = "";
  while (position < length) {
    var c = value.charAt(position++);

    if (c === '\\') {
      if (escaped) {
        /* case: \ followed by \ */
        output += '\\\\';
        escaped = false;
      } 
      else {
        /* case: single backslash */
        escaped = true;
      }
    }
    else if (c === '"') {
      if (escaped) {
        /* case: \ followed by " */
        output += '\\"';
        escaped = false;
      } 
      else {
        output += '"';
        inString = !inString;
      }
    } 
    else {
      if (inString) {
        if (escaped) {
          output += '\\' + c;
          escaped = false;
        }
        else {
          switch (c) {
            case '\b':
              output += '\\b';
              break;
            case '\f':
              output += '\\f';
              break;
            case '\n':
              output += '\\n';
              break;
            case '\t':
              output += '\\t';
              break;
            case '\r':
              output += '\\r';
              break;
            default:
              output += c;
              break;
          }
        }
      } 
      else {
        if (c >= '!') {
          output += c;
        }
      }
    }
  }

  return output;
}