function(str, options){
  var options = options || {}
    , open = options.open || exports.open || '<%'
    , close = options.close || exports.close || '%>';

  var buf = [
      "var buf = [];"
    , "\nwith (locals) {"
    , "\n  buf.push('"
  ];
  
  var lineno = 1;

  var consumeEOL = false;
  for (var i = 0, len = str.length; i < len; ++i) {
    if (str.slice(i, open.length + i) == open) {
      i += open.length
  
      var prefix, postfix, line = '__stack.lineno=' + lineno;
      switch (str.substr(i, 1)) {
        case '=':
          prefix = "', escape((" + line + ', ';
          postfix = ")), '";
          ++i;
          break;
        case '-':
          prefix = "', (" + line + ', ';
          postfix = "), '";
          ++i;
          break;
        default:
          prefix = "');" + line + ';';
          postfix = "; buf.push('";
      }

      var end = str.indexOf(close, i)
        , js = str.substring(i, end)
        , start = i
        , n = 0;
        
      if ('-' == js[js.length-1]){
        js = js.substring(0, js.length - 2);
        consumeEOL = true;
      }
        
      while (~(n = js.indexOf("\n", n))) n++, lineno++;
      if (js.substr(0, 1) == ':') js = filtered(js);
      buf.push(prefix, js, postfix);
      i += end - start + close.length - 1;

    } else if (str.substr(i, 1) == "\\") {
      buf.push("\\\\");
    } else if (str.substr(i, 1) == "'") {
      buf.push("\\'");
    } else if (str.substr(i, 1) == "\r") {
      buf.push(" ");
    } else if (str.substr(i, 1) == "\n") {
      if (consumeEOL) {
        consumeEOL = false;
      } else {
        buf.push("\\n");
        lineno++;
      }
    } else {
      buf.push(str.substr(i, 1));
    }
  }

  buf.push("');\n}\nreturn buf.join('');");
  return buf.join('');
}