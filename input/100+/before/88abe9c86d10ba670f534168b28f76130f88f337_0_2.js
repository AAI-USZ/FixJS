function(){
  $("[data-alt-text],[data-alt-class]").click(function() { toggle_alterable($(this)); });

  $("#toggle_feed").click(function() {
    if (grind.is_connected()) {
      grind.disconnect();      
      $(this).attr("data-toggled", null);
    } else {
      $(this).attr("data-toggled", "true");
      grind.connect();
    }

    // toggle_alterable($(this));

  }).click();


  ui.on_entry(function(row) {
    row.find("td[data-name]").click(function() {
      highlight($(this).attr("data-name"), $(this).html());
    });
  });

  grind.on_connected(function() { $("#clear").click(); })

}