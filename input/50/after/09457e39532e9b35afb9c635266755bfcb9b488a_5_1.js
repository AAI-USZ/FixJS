function (text, startPos, endPos) {
    text = text.substring(startPos, endPos);
    return text.replace(new RegExp("(;|\\{|\\})([^\r\n])", "g"), "$1\n$2");
  }