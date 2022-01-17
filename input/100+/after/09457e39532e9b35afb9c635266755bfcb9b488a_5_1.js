function (text, startPos, endPos) {
    text = text.substring(startPos, endPos);
    var curPos = 0;
    var reLinesSplitter = new RegExp("(;|\\{|\\})([^\r\n])", "g");
    var nonBreakableBlocks = this.getNonBreakableBlocks(text);
    if (nonBreakableBlocks != null) {
      var res = "";
      for (var i = 0; i < nonBreakableBlocks.length; i++) {
        if (nonBreakableBlocks[i].start > curPos) { // Break lines till the block
          res += text.substring(curPos, nonBreakableBlocks[i].start).replace(reLinesSplitter, "$1\n$2");
          curPos = nonBreakableBlocks[i].start;
        }
        if (nonBreakableBlocks[i].start <= curPos
          && nonBreakableBlocks[i].end >= curPos) { // Skip non-breakable block
          res += text.substring(curPos, nonBreakableBlocks[i].end);
          curPos = nonBreakableBlocks[i].end;
        }
      }
      if (curPos < text.length - 1) {
        res += text.substr(curPos).replace(reLinesSplitter, "$1\n$2");
      }
      return res;
    }
    else {
      return text.replace(reLinesSplitter, "$1\n$2");
    }
  }