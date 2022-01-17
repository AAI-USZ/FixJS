function (text) {
    return text.replace(new RegExp("(;|\\{|\\})([^\r\n])", "g"), "$1\n$2");
  }