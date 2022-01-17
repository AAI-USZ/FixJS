function onFocus() {
      if (options.readOnly == "nocursor") return;
      if (!focused) {
        if (options.onFocus) options.onFocus(instance);
        focused = true;
        if (wrapper.className.search(/\bCodeMirror-focused\b/) == -1)
          wrapper.className += " CodeMirror-focused";
        if (!leaveInputAlone) resetInput(true);
      }
      slowPoll();
      restartBlink();
    }