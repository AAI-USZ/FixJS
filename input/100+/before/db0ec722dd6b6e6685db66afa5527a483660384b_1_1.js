function() {
  if (goog.userAgent.OPERA && this.usesIframe()) {
    // We can't use addListener here because we need to listen on the window,
    // and removing listeners on window objects from the event register throws
    // an exception if the window is closed.
    this.boundFocusListenerOpera_ =
        goog.bind(this.dispatchFocusAndBeforeFocus_, this);
    this.boundBlurListenerOpera_ =
        goog.bind(this.dispatchBlur, this);
    var editWindow = this.getEditableDomHelper().getWindow();
    editWindow.addEventListener(goog.events.EventType.FOCUS,
        this.boundFocusListenerOpera_, false);
    editWindow.addEventListener(goog.events.EventType.BLUR,
        this.boundBlurListenerOpera_, false);
  } else {
    if (goog.editor.BrowserFeature.SUPPORTS_FOCUSIN) {
      this.addListener(goog.events.EventType.FOCUS, this.dispatchFocus_);
      this.addListener(goog.events.EventType.FOCUSIN,
                       this.dispatchBeforeFocus_);
    } else {
      this.addListener(goog.events.EventType.FOCUS,
                       this.dispatchFocusAndBeforeFocus_);
    }
    this.addListener(goog.events.EventType.BLUR, this.dispatchBlur,
                     goog.editor.BrowserFeature.USE_MUTATION_EVENTS);
  }

  if (goog.editor.BrowserFeature.USE_MUTATION_EVENTS) {
    // Ways to detect changes in Mozilla:
    //
    // keypress - check event.charCode (only typable characters has a
    //            charCode), but also keyboard commands lile Ctrl+C will
    //            return a charCode.
    // dragdrop - fires when the user drops something. This does not necessary
    //            lead to a change but we cannot detect if it will or not
    //
    // Known Issues: We cannot detect cut and paste using menus
    //               We cannot detect when someone moves something out of the
    //               field using drag and drop.
    //
    this.setupMutationEventHandlersGecko();
  } else {
    // Ways to detect that a change is about to happen in other browsers.
    // (IE and Safari have these events. Opera appears to work, but we haven't
    //  researched it.)
    //
    // onbeforepaste
    // onbeforecut
    // ondrop - happens when the user drops something on the editable text
    //          field the value at this time does not contain the dropped text
    // ondragleave - when the user drags something from the current document.
    //               This might not cause a change if the action was copy
    //               instead of move
    // onkeypress - IE only fires keypress events if the key will generate
    //              output. It will not trigger for delete and backspace
    // onkeydown - For delete and backspace
    //
    // known issues: IE triggers beforepaste just by opening the edit menu
    //               delete at the end should not cause beforechange
    //               backspace at the beginning should not cause beforechange
    //               see above in ondragleave
    // TODO(user): Why don't we dispatchBeforeChange from the
    // handleDrop event for all browsers?
    this.addListener(['beforecut', 'beforepaste', 'drop', 'dragend'],
        this.dispatchBeforeChange);
    this.addListener(['cut', 'paste'],
        goog.functions.lock(this.dispatchChange));
    this.addListener('drop', this.handleDrop_);
  }

  // TODO(user): Figure out why we use dragend vs dragdrop and
  // document this better.
  var dropEventName = goog.userAgent.WEBKIT ? 'dragend' : 'dragdrop';
  this.addListener(dropEventName, this.handleDrop_);

  this.addListener(goog.events.EventType.KEYDOWN, this.handleKeyDown_);
  this.addListener(goog.events.EventType.KEYPRESS, this.handleKeyPress_);
  this.addListener(goog.events.EventType.KEYUP, this.handleKeyUp_);

  this.selectionChangeTimer_ =
      new goog.async.Delay(this.handleSelectionChangeTimer_,
                           goog.editor.Field.SELECTION_CHANGE_FREQUENCY_, this);

  if (goog.editor.BrowserFeature.FOLLOWS_EDITABLE_LINKS) {
    this.addListener(
        goog.events.EventType.CLICK, goog.editor.Field.cancelLinkClick_);
  }

  this.addListener(goog.events.EventType.MOUSEDOWN, this.handleMouseDown_);
  this.addListener(goog.events.EventType.MOUSEUP, this.handleMouseUp_);
}