function createRoot(jQ, root, textbox, editable) {
  var contents = jQ.contents().detach();

  if (!textbox) {
    jQ.addClass('mathquill-rendered-math');
  }

  root.jQ = jQ.attr(mqBlockId, root.id);
  root.revert = function() {
    jQ.empty().unbind('.mathquill')
      .removeClass('mathquill-rendered-math mathquill-editable mathquill-textbox')
      .append(contents);
  };

  var cursor = root.cursor = Cursor(root);

  root.renderLatex(contents.text());

  //textarea stuff
  var textareaSpan = root.textarea = $('<span class="textarea"><textarea></textarea></span>'),
    textarea = textareaSpan.children();

  var textareaManager = manageTextarea(textarea, {
    container: jQ,
    key: function(key, evt) {
      if (editable) cursor.parent.bubble('onKey', key, evt);
    },
    text: function(text) {
      if (editable) cursor.parent.bubble('onText', text);
    },
    cut: function(e) {
      if (cursor.selection) {
        setTimeout(function() {
          cursor.deleteSelection();
          cursor.parent.bubble('redraw');
        });
      }

      e.stopPropagation();
    },
    paste: function(text) {
      // FIXME HACK the parser in RootTextBlock needs to be moved to
      // Cursor::writeLatex or something so this'll work with
      // MathQuill textboxes
      if (text.slice(0,1) === '$' && text.slice(-1) === '$') {
        text = text.slice(1, -1);
      }
      else {
        text = '\\text{' + text + '}';
      }

      cursor.writeLatex(text).show();
    }
  });

  /******
   * TODO [Han]: Document this
   */
  var textareaSelectionTimeout;
  root.selectionChanged = function() {
    if (textareaSelectionTimeout === undefined) {
      textareaSelectionTimeout = setTimeout(setTextareaSelection);
    }
    forceIERedraw(jQ[0]);
  };
  function setTextareaSelection() {
    textareaSelectionTimeout = undefined;
    var latex = cursor.selection ? '$'+cursor.selection.latex()+'$' : '';
    textareaManager.select(latex);
  }

  //prevent native selection except textarea
  jQ.bind('selectstart.mathquill', function(e) {
    if (e.target !== textarea[0]) e.preventDefault();
    e.stopPropagation();
  });

  //drag-to-select event handling
  var anticursor, blink = cursor.blink;
  jQ.bind('mousedown.mathquill', function(e) {
    function mousemove(e) {
      cursor.seek($(e.target), e.pageX, e.pageY);

      if (cursor.prev !== anticursor.prev
          || cursor.parent !== anticursor.parent) {
        cursor.selectFrom(anticursor);
      }

      return false;
    }

    // docmousemove is attached to the document, so that
    // selection still works when the mouse leaves the window.
    function docmousemove(e) {
      // [Han]: i delete the target because of the way seek works.
      // it will not move the mouse to the target, but will instead
      // just seek those X and Y coordinates.  If there is a target,
      // it will try to move the cursor to document, which will not work.
      // cursor.seek needs to be refactored.
      delete e.target;

      return mousemove(e);
    }

    function mouseup(e) {
      anticursor = undefined;
      cursor.blink = blink;
      if (!cursor.selection) {
        if (editable) {
          cursor.show();
        }
        else {
          textareaSpan.detach();
        }
      }

      // delete the mouse handlers now that we're not dragging anymore
      jQ.unbind('mousemove', mousemove);
      $(document).unbind('mousemove', docmousemove).unbind('mouseup', mouseup);
    }

    setTimeout(function() { textarea.focus(); });
      // preventDefault won't prevent focus on mousedown in IE<9
      // that means immediately after this mousedown, whatever was
      // mousedown-ed will receive focus
      // http://bugs.jquery.com/ticket/10345

    cursor.blink = noop;
    cursor.seek($(e.target), e.pageX, e.pageY);

    anticursor = {parent: cursor.parent, prev: cursor.prev, next: cursor.next};

    if (!editable) jQ.prepend(textareaSpan);

    jQ.mousemove(mousemove);
    $(document).mousemove(docmousemove).mouseup(mouseup);

    return false;
  });

  if (!editable) {
    jQ.bind('cut paste', false).bind('copy', setTextareaSelection)
      .prepend('<span class="selectable">$'+root.latex()+'$</span>');
    textarea.blur(function() {
      cursor.clearSelection();
      setTimeout(detach); //detaching during blur explodes in WebKit
    });
    function detach() {
      textareaSpan.detach();
    }
    return;
  }

  jQ.prepend(textareaSpan);

  //root CSS classes
  jQ.addClass('mathquill-editable');
  if (textbox)
    jQ.addClass('mathquill-textbox');

  //focus and blur handling
  textarea.focus(function(e) {
    if (!cursor.parent)
      cursor.appendTo(root);
    cursor.parent.jQ.addClass('hasCursor');
    if (cursor.selection) {
      cursor.selection.jQ.removeClass('blur');
      setTimeout(root.selectionChanged); //select textarea after focus
    }
    else
      cursor.show();
    e.stopPropagation();
  }).blur(function(e) {
    cursor.hide().parent.blur();
    if (cursor.selection)
      cursor.selection.jQ.addClass('blur');
    e.stopPropagation();
  });

  jQ.bind('focus.mathquill blur.mathquill', function(e) {
    textarea.trigger(e);
  }).blur();
}