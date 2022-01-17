function manageTextarea(el, handlers) {
    var keydown = null;
    var keypress = null;
    var paste = null;

    if (!handlers) handlers = {};
    var textCallback = handlers.text || noop;
    var keyCallback = handlers.key || noop;
    var pasteCallback = handlers.paste || noop;
    var cutCallback = handlers.cut || noop;

    // TODO: don't assume el is the textarea itself
    var textarea = $(el);


    // defer() runs fn immediately after the current thread.
    // flush() will run it even sooner, if possible.
    // flush always needs to be called before defer, and is called a
    // few other places besides.
    var timeout, deferredFn;
    function defer(fn) {
      timeout = setTimeout(fn);
      deferredFn = fn;
    }
    function flush() {
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
        deferredFn();
      }
    }


    // Determine whether there's a selection in the textarea.
    // This will always return false in IE < 9, since it uses
    // document.selection instead.
    function hasSelection() {
      var dom = textarea[0];

      if (!('selectionStart' in dom)) return false;
      return dom.selectionStart !== dom.selectionEnd;
    }

    // -*- private methods -*- //
    function popText(callback) {
      var text = textarea.val();
      textarea.val('');
      if (text) callback(text);
    }

    function handleText() {
      // the two cases things might show up
      // in the textarea outside of normal
      // text input are if the user is selecting
      // text, or has just pasted.
      // TODO: make sure we're not relying on this
      // in IE < 9, since hasSelection() will always
      // be false.
      if (paste || hasSelection()) return;

      popText(textCallback);
    }

    function handleKey() {
      keyCallback(stringify(keydown), keydown);
    }

    function handlePaste() {
      popText(pasteCallback);

      paste = null;
    }

    // -*- public methods -*- //
    function select(text) {
      textarea.val(text);
      if (text) textarea[0].select();
    }

    // -*- event handlers -*- //
    function onKeydown(e) {
      flush();

      keydown = e;
      keypress = null;

      handleKey();
    }

    function onKeypress(e) {
      flush();

      // call the key handler for repeated keypresses.
      // This excludes keypresses that happen directly
      // after keydown.  In that case, there will be
      // no previous keypress, so we skip it here
      if (keydown && keypress) handleKey();

      keypress = e;

      defer(handleText);
    }

    function onBlur() {
      flush();
      keydown = keypress = null;
    }

    function onInput() {
      flush();
    }

    function onPaste(e) {
      paste = e;
      setTimeout(handlePaste);
    }

    var onCut = cutCallback;

    // set up events
    textarea
      .bind('keydown', onKeydown)
      .bind('keypress', onKeypress)
      .bind('blur', onBlur)
      .bind('input', onInput)
      .bind('paste', onPaste)
      .bind('cut', onCut)
    ;

    // -*- expose public methods -*- //
    return {
      select: select,
      paste: onPaste
    }
  }