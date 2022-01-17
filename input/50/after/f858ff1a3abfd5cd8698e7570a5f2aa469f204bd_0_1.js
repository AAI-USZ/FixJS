function(e) {
      var text = self.sanitize($(this).val());
      $(self.$target).html(text);
    }