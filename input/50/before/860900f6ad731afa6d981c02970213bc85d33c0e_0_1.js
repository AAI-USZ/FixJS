function(data) {
      $("#document").html(Mustache.render(template, data));
    }