function(open, close, ctrlSeq, end) {
    _super.init.call(this, '\\left'+ctrlSeq,
        '<span class="non-leaf" #mqCmdId>'
      +   '<span class="non-leaf paren">'+open+'</span>'
      +   '<span class="non-leaf" #mqBlockId:0>#mqBlock:0</span>'
      +   '<span class="non-leaf paren">'+close+'</span>'
      + '</span>',
      [open, close]);
    this.end = '\\right'+end;
  }