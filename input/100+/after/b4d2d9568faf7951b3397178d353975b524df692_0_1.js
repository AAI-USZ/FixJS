function(event) {
    event.preventDefault();
    if (this.$yearInput.val() != '') {
      var url = "movies/" + this.$yearInput.val() + "/" + this.$nameInput.val().split(' ').join('_');
      this.$yearInput.val('');
      this.$nameInput.val('');
    } else {
      var url = "search/" + this.$nameInput.val();
    }
    AnyGood.router.navigate(url, {trigger: true});
  }