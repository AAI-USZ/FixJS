function(ctrlSeq, tagName, attrs) {
    _super.init.call(this, ctrlSeq, '<'+tagName+' '+attrs+' #mqCmdId #mqBlockId:0>#mqBlock:0</'+tagName+'>');
  }