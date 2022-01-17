function(eventType) {
    // install handlers for the events used to fake events of this type,
    // in addition to handlers for the real type
    if (focusBlurMode === SIMULATE_FOCUS_BLUR) {
      if (eventType === 'focus')
        installCapturer('focusin');
      else if (eventType === 'blur')
        installCapturer('focusout');
    } else if (focusBlurMode === SIMULATE_FOCUSIN_FOCUSOUT) {
      if (eventType === 'focusin')
        installCapturer('focus');
      else if (eventType === 'focusout')
        installCapturer('blur');
    }
    if (simulateMouseEnterLeave) {
      if (eventType === 'mouseenter')
        installCapturer('mouseover');
      else if (eventType === 'mouseleave')
        installCapturer('mouseout');
    }

    if (! eventsCaptured[eventType]) {
      // only bind one event capturer per type
      eventsCaptured[eventType] = true;
      document.addEventListener(eventType, universalCapturer, true);
    }
  }