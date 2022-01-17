function() {
    if (commentsOnly.attr('checked')) {
      $("div.change:not(.trac-new):not(:has(.trac-field-attachment)) ul.changes").hide();
      $("div.change:not(.trac-new):not(:has(.trac-field-attachment)):not(:has(.comment))").hide();
    } else {
      $("div.change ul.changes").show();
      $("div.change").show();
    }
  }