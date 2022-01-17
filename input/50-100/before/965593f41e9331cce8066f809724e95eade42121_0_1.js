function() {
    if (commentsOnly.attr('checked')) {
      $("div.change ul.changes").hide();
      $("div.change:not(:has(.comment))").hide();
    } else {
      $("div.change ul.changes").show();
      $("div.change:not(:has(.comment))").show();
    }
  }