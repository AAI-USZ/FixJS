function() {
    $(this).toggleClass("toggled");
    var alt = $(this).attr("data-togglable");
    if (typeof alt == "string" && alt.length != 0) {
      var current = $(this).html();
      $(this).html(alt);
      $(this).attr("data-togglable", current);
    }
  }