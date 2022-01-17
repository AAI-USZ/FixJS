function() {
    (function deleteMe(me) {
      delete MathElement[me.id];
      me.eachChild(deleteMe);
    }(this));
    return jQ.empty().unbind('.mathquill')
      .removeClass('mathquill-rendered-math mathquill-editable mathquill-textbox')
      .removeAttr('mathquill-block-id')
      .append(contents);
  }