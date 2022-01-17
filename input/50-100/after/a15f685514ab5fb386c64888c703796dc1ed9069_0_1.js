function() {
    $.ajax({
      url: "/",
      type: "POST",
      data: {
        "input": $("textarea").val(),
        "input-format": $("select#input-format").val(),
        "output-format": $("select#output-format").val()
      },
      success: function(response) {
        $(".output").html(response);
      },
      error: function(error) {
        $(".output").text("Crap, something went wrong!");
      }
    });
  }