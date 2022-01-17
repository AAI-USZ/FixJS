function setMathQuillDot(name, RootBlock, textbox, editable) {
  var SubClass = P(MathQuillEl, { type: name });
  MathQuill[name] = function(el) {
    var mq = MathQuill(el, '.'+name);
    if (mq instanceof SubClass) return mq;
    if (mq) throw 'MathQuill.'+name+'() was passed a MathQuill.'+mq.type;

    var rootBlock = RootBlock();
    createRoot($(el), rootBlock, textbox, editable);
    return rootBlock.publicMathQuillObj = SubClass(rootBlock);
  };
  MathQuill[name].prototype = SubClass.prototype; // for instanceof
}