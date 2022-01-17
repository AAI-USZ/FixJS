function(prefix, prefixColor, log) {
    var indent, len;
    indent = '';
    len = 10 + prefix.length;
    while (len--) {
      indent += ' ';
    }
    log = typeof log.toString === "function" ? log.toString().replace(/\n+/g, "\n" + indent) : void 0;
    return console.log("" + prefix[prefixColor].inverse + " " + (timeStamp().grey) + " " + log);
  }