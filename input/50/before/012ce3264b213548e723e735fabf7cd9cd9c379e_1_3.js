function() {
  var form;

  this.form = form = new Views.State({
    el: $(".state-form")
  });

  form.disableButton();

}