function setMathQuillDot(name, RootBlock, textbox, editable) {
  var SubClass = P(MathQuillEl, noop);
  MathQuill[name] = function(el) {
    var mq = MathQuill(el);
    if (mq) return mq; // TODO: what if mq is a MathQuillEl but not instanceof SubClass?

    var rootBlock = RootBlock();
    createRoot($(el), rootBlock, textbox, editable);
    return rootBlock.publicMathQuillObj = SubClass(rootBlock);
  };
  MathQuill[name].prototype = SubClass.prototype; // for instanceof
}