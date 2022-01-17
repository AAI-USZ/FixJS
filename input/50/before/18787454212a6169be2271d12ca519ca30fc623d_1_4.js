function makeTextBlock(latex, tagName, attrs) {
  return P(TextBlock, {
    ctrlSeq: latex,
    htmlTemplate: '<'+tagName+' '+attrs+' #mqCmdId #mqBlockId:0>#mqBlock:0</'+tagName+'>'
  });
}