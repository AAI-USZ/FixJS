function() {
  var form;

  if (Modernizr.inlinesvg && Modernizr.svg) {
    this.form = form = new Views.State({
      el: $(".state-form")
    });
    form.disableButton();
  }

}