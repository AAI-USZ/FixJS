function(ctrlSeq) {
      var cmdKlass = LatexCmds[ctrlSeq];

      if (cmdKlass) {
        return cmdKlass(ctrlSeq).parser();
      }
      else {
        var textBlock = TextBlock();
        textBlock.replaces(ctrlSeq);
        return textBlock;
      }
    }