function pickEmailState(event) {
    /*jshint validthis: true*/
    var self=this,
        // focus the first radio button by default.
        focusSelector = "input[type=radio]:eq(0)";

    // unless a radio button is checked, then focus it.
    if (dom.getElements("input[type=radio]:checked").length) {
      focusSelector = "input[type=radio]:checked";
    }
    dom.focus(focusSelector);

    self.submit = signIn;
  }