function showError(el, oncomplete) {
    dom.hide(".hint,#signUpForm");
    $(el).fadeIn(ANIMATION_TIME, oncomplete);
  }