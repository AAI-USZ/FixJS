function(e) {
      var text = self.sanatize($(this).val());
      $(self.$target).html(text);
    }