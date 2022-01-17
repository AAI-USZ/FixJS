function(_, _super) {
  _.ctrlSeq = '\\frac';
  _.htmlTemplate =
      '<span class="fraction non-leaf" #mqCmdId>'
    +   '<span class="numerator" #mqBlockId:0>#mqBlock:0</span>'
    +   '<span class="denominator" #mqBlockId:1>#mqBlock:1</span>'
    +   '<span style="display:inline-block;width:0">&nbsp;</span>'
    + '</span>'
  ;
  _.textTemplate = ['(', '/', ')'];
}