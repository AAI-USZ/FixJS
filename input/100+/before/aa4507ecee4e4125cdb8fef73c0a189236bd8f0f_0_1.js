function(event) {
    // fire synthetic focusin/focusout on blur/focus or vice versa
    if (event.currentTarget === event.target) {
      if (focusBlurMode === SIMULATE_FOCUS_BLUR) {
        if (event.type === 'focusin')
          sendUIEvent('focus', event.target, false);
        else if (event.type === 'focusout')
          sendUIEvent('blur', event.target, false);
      } else if (focusBlurMode === SIMULATE_FOCUSIN_FOCUSOUT) {
        if (event.type === 'focus')
          sendUIEvent('focusin', event.target, true);
        else if (event.type === 'blur')
          sendUIEvent('focusout', event.target, true);
      }
    }
    // only respond to synthetic events of the types we are faking
    if (focusBlurMode === SIMULATE_FOCUS_BLUR) {
      if (event.type === 'focus' || event.type === 'blur') {
        if (! event.synthetic)
          return;
      }
    } else if (focusBlurMode === SIMULATE_FOCUSIN_FOCUSOUT) {
      if (event.type === 'focusin' || event.type === 'focusout') {
        if (! event.synthetic)
          return;
      }
    }
    if (simulateMouseEnterLeave) {
      if (event.type === 'mouseenter' || event.type === 'mouseleave') {
        if (! event.synthetic)
          return;
      }
    }

    Meteor.ui._event._handleEventFunc(
      Meteor.ui._event._fixEvent(event));

    // fire mouseleave after mouseout
    if (simulateMouseEnterLeave &&
        (event.currentTarget === event.target)) {
      if (event.type === 'mouseover')
        sendUIEvent('mouseenter', event.target, false);
      else if (event.type === 'mouseout') {
        sendUIEvent('mouseleave', event.target, false);
      }
    }
  }