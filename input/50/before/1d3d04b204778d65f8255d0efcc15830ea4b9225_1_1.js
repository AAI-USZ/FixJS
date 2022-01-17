function() {
    jQ.empty().unbind('.mathquill')
      .removeClass('mathquill-rendered-math mathquill-editable mathquill-textbox')
      .append(contents);
  }