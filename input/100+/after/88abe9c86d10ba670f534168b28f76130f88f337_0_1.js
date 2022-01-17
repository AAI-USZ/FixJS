function(name, value) {
  console.log("Highlighting all " + name + " columns with a value of: " + value)

  var us = [], were_highlighted = false;
  $("table td[data-name=" + name + "]").each(function() {
    if ($(this).html() == value)
      us.push($(this).get(0));
  });
  us = $(us);

  if (us.length == 0) {
    highlighted = null;
    return;
  }

  if (us.hasClass("highlighted"))
    were_highlighted = true;
  
  $("table .highlighted").removeClass("highlighted");
  
  if (were_highlighted) {
    return dehighlight();
  }

  us.addClass("highlighted");
  us.each(function() { $(this).parent().addClass("highlighted"); });

  $("#highlighted").html($("#highlighted").html().replace(/\d+/, us.length));
  highlighted = true;
}