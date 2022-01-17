function(el) {
    var mq = MathQuill(el);
    if (mq) return mq; // TODO: what if mq is a MathQuillEl but not instanceof SubClass?

    var rootBlock = RootBlock();
    createRoot($(el), rootBlock, textbox, editable);
    return rootBlock.publicMathQuillObj = SubClass(rootBlock);
  }