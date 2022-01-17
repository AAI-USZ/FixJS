function() {
      self = this;
      $.post("/logoff", function() {
        location.reload();
      });
    }